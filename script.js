// Load YAML from textarea or file input (paste YAML content)
document.getElementById('loadBtn').addEventListener('click', () => {
    const yamlStr = prompt('Paste YAML content from data.yaml:');
    if (yamlStr) {
        const data = jsyaml.load(yamlStr);
        populateForm(data);
        updatePreview();
    }
});

// Save current form to YAML string
document.getElementById('saveBtn').addEventListener('click', () => {
    const data = collectFormData();
    const yamlStr = jsyaml.dump(data);
    navigator.clipboard.writeText(yamlStr).then(() => alert('YAML copied! Paste into data.yaml and commit.'));
});

// Export PDF
document.getElementById('exportBtn').addEventListener('click', () => {
    const element = document.getElementById('previewFrame').contentDocument.body;
    html2pdf().from(element).set({ filename: 'Atanu-Paul-CV.pdf', margin: 1, jsPDF: { unit: 'in', format: 'a4' } }).save();
});

// Template switch
document.getElementById('templateSelect').addEventListener('change', updatePreview);

// Populate form from data object
function populateForm(data) {
    document.getElementById('name').value = data.personal?.name || '';
    // Add similar for phone, email, jobs, etc. from your CV structure [file:1]
}

// Collect form data to object
function collectFormData() {
    return {
        personal: {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            // Collect all fields...
        },
        experience: [
            // Array from .exp-item elements
        ]
        // Full structure matching your CV sections
    };
}

// Update preview iframe
function updatePreview() {
    const template = document.getElementById('templateSelect').value;
    const data = collectFormData();
    const iframe = document.getElementById('previewFrame');
    iframe.srcdoc = generateHTML(template, data);  // Render with template + data
}

function generateHTML(template, data) {
    if (template === 'classic') {
        return `
            <!DOCTYPE html><html><head><link rel="stylesheet" href="styles.css"></head><body>
            <div class="template-classic">
                <div class="left"><!-- Photo, skills from data --></div>
                <div class="right">
                    <h1>${data.personal.name}</h1>
                    <!-- Render experience, education -->
                </div>
            </div>
            </body></html>`;
    } else {
        // Modern template HTML
        return `<!-- Similar structure -->`;
    }
}

// Auto-update preview on input change
document.querySelectorAll('.editor input, .editor textarea').forEach(el => {
    el.addEventListener('input', updatePreview);
});

// Init with your data
updatePreview();
