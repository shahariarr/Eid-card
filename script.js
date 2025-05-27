$(document).ready(function() {
    // Update template data with optimized colors
    const templates = [
        {
            id: 0,
            name: 'ক্লাসিক সাদা',
            image: 'img/v1.jpg',
            textColor: '#f2a41e',
            noteColor: '#f2a41e'
        },
        {
            id: 1, 
            name: 'মডার্ন বেইজ',
            image: 'img/v2.jpg',
            textColor: '#2C1810',
            noteColor: '#4A2C24'
        },
        {
            id: 2,
            name: 'সবুজ গ্রাডিয়েন্ট', 
            image: 'img/v3.jpg',
            textColor: '#052941',
            noteColor: '#052941'
        },
        {
            id: 3,
            name: 'নীল টেমপ্লেট',
            image: 'img/v4.jpg', 
            textColor: '#052941',
            noteColor: '#052941'
        },
        {
            id: 4,
            name: 'টেমপ্লেট ৫',
            image: 'img/v5.jpg',
            textColor: '#f7d512',
            noteColor: '#f7d512'
        },
        {
            id: 5,
            name: 'টেমপ্লেট ৬',
            image: 'img/v6.jpg',
            textColor: '#714d29',
            noteColor: '#714d29'
        },
        {
            id: 6,
            name: 'টেমপ্লেট ৭',
            image: 'img/v7.jpg',
            textColor: '#fcc510',
            noteColor: '#fcc510'
        },
        {
            id: 7,
            name: 'টেমপ্লেট ৮',
            image: 'img/v8.jpg',
            textColor: '#6c9494',
            noteColor: '#6c9494'
        },
        {
            id: 8,
            name: 'টেমপ্লেট ৯',
            image: 'img/v9.jpg',
            textColor: '#292560',
            noteColor: '#292560'
        },
        {
            id: 9,
            name: 'টেমপ্লেট ১০',
            image: 'img/v10.jpg',
            textColor: '#fac213',
            noteColor: '#fac213'
        },
        {
            id: 10,
            name: 'টেমপ্লেট ১১',
            image: 'img/v11.jpg',
            textColor: '#671f13',
            noteColor: '#671f13'
        },
        {
            id: 11,
            name: 'টেমপ্লেট ১২',
            image: 'img/v12.jpg',
            textColor: '#f8c422',
            noteColor: '#f8c422'
        }
    ];

    let currentTemplate = 0;

    // Initialize
    updateCard();

    // Template selection
    $('.template-item').click(function() {
        const templateId = parseInt($(this).data('template'));
        currentTemplate = templateId;
        
        $('.template-item').removeClass('active');
        $(this).addClass('active');
        
        updateCard();
    });

    // Navigation buttons
    $('#prevBtn').click(function() {
        currentTemplate = currentTemplate > 0 ? currentTemplate - 1 : templates.length - 1;
        updateTemplateSelection();
        updateCard();
    });

    $('#nextBtn').click(function() {
        currentTemplate = currentTemplate < templates.length - 1 ? currentTemplate + 1 : 0;
        updateTemplateSelection();
        updateCard();
    });

    // Input changes
    $('#userName, #userNote').on('input', function() {
        updateCard();
    });

    // Download button
    $('#downloadBtn').click(function() {
        // Show loading state
        const $btn = $(this);
        $btn.prop('disabled', true);
        $btn.html('<span>⏳</span> প্রস্তুত হচ্ছে...');

        try {
            // Get the original image source
            const originalImage = document.getElementById('templateImage');
            const imageSrc = originalImage.src;

            // Create download link
            const link = document.createElement('a');
            link.download = 'eid-card.png';
            link.href = imageSrc;
            
            // Trigger download
            link.click();
            
            // Reset button state
            $btn.prop('disabled', false);
            $btn.html('<span>📥</span> ডাউনলোড');
        } catch (error) {
            console.error('Error:', error);
            alert('দুঃখিত, ডাউনলোড করা যায়নি। আবার চেষ্টা করুন।');
            
            // Reset button state
            $btn.prop('disabled', false);
            $btn.html('<span>📥</span> ডাউনলোড');
        }
    });

    // Share button
    $('#shareBtn').click(function() {
        const userName = $('#userName').val();
        const userNote = $('#userNote').val();
        const templateName = templates[currentTemplate].name;
        
        const shareText = `ঈদ মোবারক! 🌙\n\n${userName ? userName + '\n' : ''}${userNote ? userNote + '\n' : ''}\nটেমপ্লেট: ${templateName}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'ঈদ কার্ড',
                text: shareText
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(shareText).then(function() {
                alert('টেক্সট কপি করা হয়েছে! এখন আপনি যেকোনো জায়গায় পেস্ট করতে পারেন।');
            }).catch(function() {
                alert('শেয়ার ফিচার এই ব্রাউজারে সাপোর্ট করে না।');
            });
        }
    });

    // Update card function
    function updateCard() {
        const template = templates[currentTemplate];
        const userName = $('#userName').val();
        const userNote = $('#userNote').val();

        // Fade out
        $('.card-container').fadeOut(200, function() {
            // Update template image or background
            if (template.image) {
                $('#templateImage').attr('src', template.image).show();
                $('#cardContainer').css('background', 'none');
            }

            $('#displayName')
                .text(userName)
                .css({
                    'color': template.textColor,
                    'text-shadow': 'none'  // Remove text shadow
                });

            $('#displayNote')
                .text(userNote)
                .css({
                    'color': template.noteColor,
                    'text-shadow': 'none'  // Remove text shadow
                });

            // Fade in
            $(this).fadeIn(200);
        });
    }

    // Update template selection
    function updateTemplateSelection() {
        $('.template-item').removeClass('active');
        $(`.template-item[data-template="${currentTemplate}"]`).addClass('active');
    }

    // Add some animation effects
    $('.btn').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Add typing effect for better UX
    let typingTimer;
    $('#userName, #userNote').on('input', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function() {
            updateCard();
        }, 100);
    });

    // Add hover effect on card preview
    $('.card-container').hover(
        function() {
            $(this).css('transform', 'scale(1.02)');
            $(this).css('transition', 'transform 0.3s ease');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // Add loading animation
    $('.template-item').click(function() {
        $(this).addClass('loading');
        setTimeout(() => {
            $(this).removeClass('loading');
        }, 500);
    });

    // Add keyboard navigation
    $(document).keydown(function(e) {
        if (e.keyCode === 37) { // Left arrow
            $('#prevBtn').click();
        } else if (e.keyCode === 39) { // Right arrow
            $('#nextBtn').click();
        }
    });

    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    $('.card-preview').on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    $('.card-preview').on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                $('#prevBtn').click();
            } else {
                $('#nextBtn').click();
            }
        }
    }
});