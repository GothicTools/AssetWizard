#include <UBytes/AppPlatform/Everything.hpp>

#include <rapidjson/document.h>
#include <fmt/core.h>

#include <filesystem>
#include <cassert>

#include "App/ProgramArgs.hpp"
#include "UI/FrontendUtil.hpp"

namespace fs   = std::filesystem;
namespace uapp = ubytes::app_platform;

static auto shrink(uapp::Rect2i rect, int amount) -> uapp::Rect2i
{
  return uapp::Rect2i{rect.x + amount, rect.y + amount, rect.w - amount * 2, rect.h - amount * 2};
}

static auto calc_webview_size(uapp::Rect2u window_size) -> uapp::Rect2i
{
  return shrink({0, 0, int(window_size.w), int(window_size.h)}, 4);
}


struct CustomWindow : uapp::Window
{
  auto on_resize(uapp::Rect2u size) -> void override
  {
    web_view.set_bounds(calc_webview_size(size));
  }

  uapp::WebView web_view;
};

struct CustomAppHandler : uapp::AppInterface
{
  auto on_start() -> void override
  {
    main_window = uapp::Window::create<CustomWindow>();
    main_window->set_borderless();
    main_window->background_color.set_rgb(20, 20, 20);

    auto& web_view = main_window->web_view;

    web_view = uapp::WebView();
    web_view.begin_setup(*main_window);

    web_view.on_ready = [&]
    {
      auto current_dir = fs::current_path();

      auto inner_size = main_window->get_inner_size();
      web_view.set_bounds(calc_webview_size(inner_size));
      web_view.navigate(get_frontend_url());
    };

    web_view.on_message = [&](std::string message)
    {
      namespace rj = rapidjson;
      auto doc     = rj::Document();
      doc.Parse(message.data(), message.size());
      if (doc.HasParseError()) {
        fmt::print("Failed to parse message\n");
        return;
      }

      auto& type = doc["type"];
      if (type == "event") {
        auto& name = doc["name"];
        if (name == "closed") {
          main_window->request_close();
        }
        else if (name == "maximized") {
          main_window->request_toggle_maximize();
        }
        else if (name == "minimized") {
          main_window->request_minimize();
        }
      }
      fmt::print("Message from webview: {}\n", message);
    };
  }

  std::unique_ptr<CustomWindow> main_window;
};

struct Application
{
public:
  auto get_app_platform_interface() -> uapp::AppInterface&
  {
    return _app_platform_interface;
  }

private:
  CustomAppHandler _app_platform_interface;
};

auto main(int argc, char* argv[]) -> int
{
  // One-time operation for convenient access later.
  store_program_args(argc, argv);

  auto app = Application();
  return uapp::run_default(app.get_app_platform_interface());
}