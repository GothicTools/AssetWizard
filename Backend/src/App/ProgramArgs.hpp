#pragma once

#include <vector>
#include <string_view>

struct ProgramArgs;

/// A one-time operation that stores the program arguments into
/// a static variable. This way we can access them conveniently
/// later in the program.
///
/// @param argc number of arguments
/// @param argv values of the arguments
/// @return
auto store_program_args(int argc, char** argv) -> void;

/// Returns a read-only access to the program arguments.
auto use_program_args() -> ProgramArgs const&;

/// Stores the program arguments as a vector of string_views.
/// Provides convenient access to the arguments.
struct ProgramArgs
{
  std::vector<std::string_view> content;

  /// Checks if the program arguments contain a specific flag.
  /// @param flag the flag to check for (e.g. "--help", "-h", "--version")
  /// @return true if the flag is present, false otherwise
  auto has_flag(std::string_view flag) const -> bool;
};