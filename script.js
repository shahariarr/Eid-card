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

    // Initialize text position and size variables
    let textSettings = {
        name: {
            top: 0,
            left: 0,
            size: 18
        },
        note: {
            top: 0,
            left: 0,
            size: 14
        }
    };

    // Position adjustment buttons
    $('.position-btn').click(function() {
        const target = $(this).data('target');
        const direction = $(this).data('direction');
        const step = 5; // pixels to move
        
        switch(direction) {
            case 'up':
                textSettings[target].top -= step;
                break;
            case 'down':
                textSettings[target].top += step;
                break;
            case 'left':
                textSettings[target].left -= step;
                break;
            case 'right':
                textSettings[target].left += step;
                break;
        }
        
        updateTextPosition(target);
        updateCard();
    });

    // Size adjustment buttons
    $('.size-btn').click(function() {
        const target = $(this).data('target');
        const action = $(this).data('action');
        const step = 1; // font size increment
        
        if (action === 'increase') {
            textSettings[target].size += step;
        } else {
            // Don't allow font size below 8px
            if (textSettings[target].size > 8) {
                textSettings[target].size -= step;
            }
        }
        
        updateTextSize(target);
        updateCard();
    });

    // Update text position
    function updateTextPosition(target) {
        if (target === 'name') {
            $('#displayName').css({
                'transform': `translate(${textSettings.name.left}px, ${textSettings.name.top}px)`
            });
        } else {
            $('#displayNote').css({
                'transform': `translate(${textSettings.note.left}px, ${textSettings.note.top}px)`
            });
        }
    }

    // Update text size
    function updateTextSize(target) {
        if (target === 'name') {
            $('#displayName').css('font-size', textSettings.name.size + 'px');
        } else {
            $('#displayNote').css('font-size', textSettings.note.size + 'px');
        }
    }

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
                    'text-shadow': 'none',
                    'font-size': textSettings.name.size + 'px',
                    'transform': `translate(${textSettings.name.left}px, ${textSettings.name.top}px)`,
                    'font-family': 'Ekushey Aloucik 16-11-2018'
                });

            $('#displayNote')
                .text(userNote)
                .css({
                    'color': template.noteColor,
                    'text-shadow': 'none',
                    'font-size': textSettings.note.size + 'px',
                    'transform': `translate(${textSettings.note.left}px, ${textSettings.note.top}px)`,
                    'font-family': 'Ekushey Aloucik 16-11-2018'
                });

            // Fade in
            $(this).fadeIn(200);
        });
    }

    // Add settings export functionality
    $('#saveSettingsBtn').click(function() {
        // Prepare settings object with current values
        const settingsToExport = {
            template: currentTemplate,
            textSettings: textSettings
        };
        
        // Convert settings to JSON string
        const settingsJSON = JSON.stringify(settingsToExport, null, 2);
        
        // Create blob from JSON
        const blob = new Blob([settingsJSON], { type: 'application/json' });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'eid-card-settings.json';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show confirmation
        alert('সেটিংস সংরক্ষণ করা হয়েছে!');
    });

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

    // Download button
    $('#downloadBtn').click(function() {
        // Show loading state
        const $btn = $(this);
        $btn.prop('disabled', true);
        $btn.html('<span>⏳</span> প্রস্তুত হচ্ছে...');

        try {
            // Get original image for dimensions
            const originalImage = document.getElementById('templateImage');
            const width = 360;
            const height = 400;

            // Create canvas with original dimensions
            html2canvas(document.querySelector('.card-container'), {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                width: width,
                height: height,
                scale: 1,
                imageTimeout: 0,
                onclone: function(clonedDoc) {
                    // Ensure text positioning matches display
                    const clonedContainer = clonedDoc.querySelector('.card-container');
                    const clonedName = clonedDoc.querySelector('#displayName');
                    const clonedNote = clonedDoc.querySelector('#displayNote');
                    
                    // Maintain text styles
                    clonedContainer.style.width = width + 'px';
                    clonedContainer.style.height = height + 'px';
                    
                    // Apply current template colors
                    const template = templates[currentTemplate];
                    clonedName.style.color = template.textColor;
                    clonedNote.style.color = template.noteColor;

                    // Apply position and size settings
                    clonedName.style.fontSize = textSettings.name.size + 'px';
                    clonedName.style.transform = `translate(${textSettings.name.left}px, ${textSettings.name.top}px)`;
                    
                    clonedNote.style.fontSize = textSettings.note.size + 'px';
                    clonedNote.style.transform = `translate(${textSettings.note.left}px, ${textSettings.note.top}px)`;
                }
            }).then(function(canvas) {
                // Convert to high quality PNG
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                
                // Create download link
                const link = document.createElement('a');
                link.download = 'eid-card.png';
                link.href = dataUrl;
                
                // Trigger download
                link.click();
                
                // Reset button state
                $btn.prop('disabled', false);
                $btn.html('<span>📥</span> ডাউনলোড');
            });
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
});