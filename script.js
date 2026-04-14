document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');

    // Replace the link below with your actual IntaSend Payment Link
    const INTASEND_PAY_LINK = "https://payment.intasend.com/pay/your-unique-slug-here/";

    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Collect the data from the inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // 2. Create a User Object
        const userTicketData = {
            fullName: name,
            emailAddress: email,
            phoneNumber: phone,
            date: new Date().toLocaleString()
        };

        // 3. Save to localStorage (Phase 4 requirement)
        // This keeps a record on the user's phone/computer 
        // in case the payment finishes but they close the tab.
        localStorage.setItem('last_reg_attempt', JSON.stringify(userTicketData));

        // 4. Redirect to IntaSend
        console.log("Redirecting to payment...");
        window.location.href = INTASEND_PAY_LINK;
    });
});
