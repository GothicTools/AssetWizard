#include "./FrontendUtil.hpp"
#include "../App/ProgramArgs.hpp"

#include <filesystem>


static auto get_default_frontend_url() -> std::string
{
  namespace fs = std::filesystem;

  auto current_dir = fs::current_path();
  return (current_dir / "data/frontend/index.html").string();
}

static auto get_live_frontend_url() -> std::string
{
  return "http://localhost:3000";
}

auto get_frontend_url() -> std::string
{
  auto live = false;
#ifndef NDEBUG
  auto& args = use_program_args();
  live       = args.has_flag("--live");
#endif

  if (live) {
    return get_live_frontend_url();
  }
  return get_default_frontend_url();
}