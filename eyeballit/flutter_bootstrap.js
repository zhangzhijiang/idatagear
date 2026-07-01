// Custom Flutter web bootstrap.
//
// The `{{flutter_js}}` and `{{flutter_build_config}}` tokens below are filled in
// by `flutter build web`. We use them to load the engine into a specific host
// element (#game-host, the centre column) so the left/right ad rails in
// index.html remain visible instead of Flutter taking over the whole <body>.

{{flutter_js}}
{{flutter_build_config}}

const gameHost = document.querySelector("#game-host");

_flutter.loader.load({
  config: {
    hostElement: gameHost,
  },
  onEntrypointLoaded: async function (engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine({
      hostElement: gameHost,
    });
    // Engine is ready to paint — drop the placeholder loading text.
    const loading = document.querySelector("#loading");
    if (loading) loading.remove();
    await appRunner.runApp();
  },
});
