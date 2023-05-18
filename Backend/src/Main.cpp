#include <UBytes/AppPlatform/Everything.hpp>

#include <iostream>
#include <filesystem>

namespace fs   = std::filesystem;
namespace uapp = ubytes::app_platform;

struct CustomWindow : uapp::Window
{
  auto on_resize(uapp::Rect2u size) -> void override
  {
    web_view.set_bounds(uapp::Rect2i{4, 4, int(size.w) - 8, int(size.h) - 8});
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
      web_view.set_bounds(uapp::Rect2i{4, 4, int(inner_size.w - 8), int(inner_size.h - 8)});
      // web_view.navigate(L"http://localhost:3000");
      web_view.navigate(L"file://" + (current_dir / "data/frontend/index.html").wstring());
    };

    web_view.on_message = [&](std::string message) { std::cout << "Message from webview: " << message << std::endl; };
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

auto main() -> int
{
  auto app = Application();

  return uapp::run_default(app.get_app_platform_interface());
}