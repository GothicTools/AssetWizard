#include "ProgramArgs.hpp"

#include <algorithm>
#include <cassert>

// [internal] Read-write access to the args instance
static auto access_program_args() -> ProgramArgs&
{
  static auto args = ProgramArgs();
  return args;
}

auto store_program_args(int argc, char** argv) -> void
{
  auto& args = access_program_args();

  assert(args.content.empty() && "Program args already set");

  args.content.resize(argc);
  for (auto i = 0; i < argc; ++i) {
    args.content[i] = std::string_view(argv[i]);
  }
}

auto use_program_args() -> ProgramArgs const&
{
  return access_program_args();
}

auto ProgramArgs::has_flag(std::string_view flag) const -> bool
{
  return std::ranges::find(content, flag) != content.end();
}