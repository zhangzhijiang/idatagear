// Custom Flutter web bootstrap.
//
// The two placeholder tokens on the lines just below are filled in by
// `flutter build web` (do NOT name those tokens in this comment: the build
// does a naive global text-replace, so mentioning them here would inject the
// engine loader into this comment and break the file). They load the engine
// into a specific host element (#game-host, the centre column) so the
// left/right ad rails in index.html stay visible instead of Flutter taking
// over the whole <body>.

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
