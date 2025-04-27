// Fixed Responsive Tester JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const frame = document.getElementById('responsiveFrame');
    const urlInput = document.getElementById('responsiveUrl');
    const loadBtn = document.getElementById('loadUrl');
    const deviceBtns = document.querySelectorAll('.device-selection button');
    const viewportDisplay = document.getElementById('viewportSize');

    // Default device dimensions (Mobile)
    const devicePresets = {
        '375': { width: 375, height: 667, name: 'Mobile' },
        '768': { width: 768, height: 1024, name: 'Tablet' },
        '1024': { width: 1024, height: 768, name: 'Laptop' },
        '100%': { width: '100%', height: '100%', name: 'Desktop' }
    };

    // Set default device
    let currentDevice = '375';

    // Device selection handler
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            deviceBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDevice = this.dataset.width;
            updateFrameSize();
        });
    });

    // Load URL handler
    loadBtn.addEventListener('click', loadUrl);
    urlInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') loadUrl();
    });

    // Frame size updater
    function updateFrameSize() {
        const device = devicePresets[currentDevice];

        if (currentDevice === '100%') {
            frame.style.width = '100%';
            frame.style.height = '500px'; // Fixed height for desktop view
            viewportDisplay.textContent = '100% width';
        } else {
            frame.style.width = `${device.width}px`;
            frame.style.height = `${device.height}px`;
            viewportDisplay.textContent = `${device.width}×${device.height}`;
        }
    }

    // URL loader with error handling
    function loadUrl() {
        let url = urlInput.value.trim();

        // Add https:// if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
            urlInput.value = url;
        }

        if (isValidUrl(url)) {
            frame.src = url;

            // Hide fallback
            frame.style.display = 'block';
            document.querySelector('.frame-fallback').style.display = 'none';
        } else {
            alert('Please enter a valid URL (e.g., https://example.com)');
        }
    }

    // Helper function to validate URLs
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Error handling for iframe
    frame.addEventListener('error', function () {
        alert('Could not load this URL due to security restrictions or invalid URL');
        frame.src = 'about:blank';
        document.querySelector('.frame-fallback').style.display = 'flex';
    });

    // Initial load
    updateFrameSize();
    if (urlInput.value.trim()) {
        setTimeout(() => loadUrl(), 500); // Load default URL after slight delay
    }
});