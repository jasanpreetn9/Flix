<script>
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import Artplayer from 'artplayer';
	export let streamingData;
	streamingData.sources = streamingData.sources
		.filter((ep) => ep.quality != 'auto')
		.map((ep) => {
			return {
				...ep,
				quality: Number(ep.quality),
				html: `${ep.quality}p`
			};
		});
	let artplayer;
	let intervalId;

	async function initPlayer() {
		const defaultSource = streamingData.sources.reduce((prev, current) => {return prev.quality > current.quality ? prev : current}).url;
		artplayer = new Artplayer({
			container: '.artplayer-container',
			// id: `${details.idMal}-${currentEp.number}`,
			quality: streamingData.sources,
			autoPlayback: true,
			autoplay: true,
			autoOrientation: true,
			pip: true,
			hotkey: true,
			autoSize: true,
			fullscreen: true,
			playsInline: true,
			airplay: true,
			theme: '#23ade5',
			type: 'm3u8',
			url: defaultSource,
			customType: { m3u8: playM3u8 }
		});
	}

	function playM3u8(video, url, art) {
		if (Hls.isSupported()) {
			if (art.hls) art.hls.destroy();
			const hls = new Hls();
			hls.loadSource(url);
			hls.attachMedia(video);
			art.hls = hls;
			art.on('destroy', () => hls.destroy());
		} else if (video.canPlayType('application/vnd.apple.m3u8')) {
			video.src = url;
		} else {
			art.notice.show = 'Unsupported playback format: m3u8';
		}
	}

	onMount(initPlayer);
	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
		if (artplayer) artplayer.destroy();
	});
</script>

<div class="artplayer-container" />

<style>
	.artplayer-container {
		width: 100%;
		aspect-ratio: 16/9;
		margin-bottom: 30px;
		margin-top: 50px;
	}
</style>
