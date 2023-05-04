const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCuvq-l94LVPqSZQnv8Lop4Q&part=snippet%2Cid&order=date&maxResults=10';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7a29daab83msh93e42bd8acbf427p1066cejsna8ab58d0e89e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function getVideos(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await getVideos(API);
        let view = `${videos.items.map(video => `
            <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank"
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            </a>
        `).splice(0, videos.items.length-1).join('')}`;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
        alert('Error al cargar los videos');
    }
})();