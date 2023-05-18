cmake_minimum_required(VERSION 3.25)

project(GothicAssetWizard VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)

file(GLOB_RECURSE BACKEND_SOURCES
	"Backend/src/*.cpp"
	"Backend/src/*.hpp"
)

set(APP_NAME GothicAssetWizard)
add_executable(${APP_NAME} ${BACKEND_SOURCES} Icon.rc)

target_include_directories(${APP_NAME} PUBLIC "thirdparty/rapidjson/include")

set_target_properties(${APP_NAME} PROPERTIES
	RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/Debug
	LIBRARY_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/Debug
	ARCHIVE_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/Debug
	RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/Release
	LIBRARY_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/Release
	ARCHIVE_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/Release
)

add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/thirdparty/UBytesAppPlatform)
target_link_libraries(${APP_NAME} AppPlatform)