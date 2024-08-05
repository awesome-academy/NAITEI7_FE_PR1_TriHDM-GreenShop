$(document).ready(function() {
    // Check if the popup should be displayed
    if (!localStorage.getItem('dontShowAgain')) {
        $('.overlay').show();
        $('.popup').show();
    }

    // Close the popup
    $('.close').on('click', function() {
        if ($('#dontShowAgain').is(':checked')) {
            localStorage.setItem('dontShowAgain', true);
        }
        $('.overlay').hide();
        $('.popup').hide();
    });

    // Close the popup when clicking outside of it
    $('.overlay').on('click', function() {
        $('.overlay').hide();
        $('.popup').hide();
    });
});