// Main Portfolio Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Plotly Visualizations
    initFinancialCharts();
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Initialize scroll animations
    setupScrollAnimations();
});

function initFinancialCharts() {
    // Volatility Surface Plot
    const volSurfaceData = [{
        z: [[0.25, 0.3, 0.35], [0.3, 0.35, 0.4], [0.35, 0.4, 0.45]],
        x: [90, 100, 110],
        y: [0.25, 0.5, 1],
        type: 'surface',
        colorscale: 'Viridis'
    }];

    Plotly.newPlot('vol-surface-plot', volSurfaceData, {
        title: 'Volatility Surface',
        margin: { t: 30, b: 20 },
        scene: {
            xaxis: { title: 'Strike Price' },
            yaxis: { title: 'Time to Maturity' },
            zaxis: { title: 'Implied Volatility' }
        }
    });

    // Efficient Frontier Plot
    const efficientFrontierData = [{
        x: [0.1, 0.15, 0.2, 0.25, 0.3],
        y: [0.08, 0.12, 0.15, 0.14, 0.13],
        mode: 'lines+markers',
        name: 'Efficient Frontier',
        line: { color: var(--secondary-color) }
    }];

    Plotly.newPlot('efficient-frontier-plot', efficientFrontierData, {
        title: 'Portfolio Efficient Frontier',
        xaxis: { title: 'Risk (σ)' },
        yaxis: { title: 'Return (μ)' },
        margin: { t: 30, b: 40 }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-progress, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if(rect.top < window.innerHeight * 0.8) {
                bar.style.width = bar.getAttribute('data-width') || '80%';
            }
        });
    });
}

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add form submission logic here
    alert('Message sent successfully!');
    this.reset();
});
