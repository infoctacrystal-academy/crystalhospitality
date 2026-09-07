document.addEventListener('DOMContentLoaded', () => {
  const vacanciesContainer = document.getElementById('vacancies-container');
  
  if (vacanciesContainer) {
    const vacancies = [
      {
        id: 1,
        title: "Customer Service Receptionist Intern",
        description: "Gain hands-on front office experience in basic hospitality operations with direct conversion opportunities into full-time roles.",
        hours: "8:00 AM – 3:00 PM",
        duration: "2 Months",
        location: "Gaushala, Kathmandu"
      }
    ];

    if (vacancies && vacancies.length > 0) {
      vacanciesContainer.innerHTML = vacancies.map(job => `
        <div class="career-banner" style="margin-bottom: 20px;">
          <div class="career-info">
            <span class="job-tag">Active Opening</span>
            <h3>${job.title}</h3>
            <p>${job.description}</p>
            <ul class="job-meta">
              <li><i class="fa-solid fa-clock"></i> <strong>Daily Hours:</strong> ${job.hours}</li>
              <li><i class="fa-solid fa-calendar-days"></i> <strong>Duration:</strong> ${job.duration}</li>
              <li><i class="fa-solid fa-location-dot"></i> <strong>Location:</strong> ${job.location}</li>
            </ul>
          </div>
          <div class="career-action">
            <div class="apply-box">
              <h4>How to Apply</h4>
              <p>Send your CV if interested:</p>
              <a href="mailto:infocta.crystal@gmail.com" class="btn-email"><i class="fa-solid fa-envelope"></i> infocta.crystal@gmail.com</a>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      vacanciesContainer.innerHTML = '<p style="color: #cbd5e1; text-align: center;">No active vacancies right now.</p>';
    }
  }

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your inquiry has been sent successfully.');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 800);
    });
  }
});
