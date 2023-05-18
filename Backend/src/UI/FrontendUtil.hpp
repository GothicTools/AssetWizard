#pragma once

#include <string>

/// Returns the URL that the WebView should navigate to
/// to access the app's frontend.
/// For a live mode, use program argument "--live" (DEBUG build only).
/// Otherwise the frontend is loaded from the "data/frontend" directory (relative to cwd).
auto get_frontend_url() -> std::string;