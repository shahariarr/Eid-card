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
        
        // Reset custom colors when switching templates
        customColors.name = null;
        customColors.note = null;
        
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

    // Color picker change events
    let customColors = {
        name: null,
        note: null
    };

    $('.color-picker').on('input', function() {
        const target = $(this).data('target');
        customColors[target] = $(this).val();
        updateCard();
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
            
            // Use custom colors if set, otherwise use template colors
            const nameColor = customColors.name || template.textColor;
            const noteColor = customColors.note || template.noteColor;
            
            // Set initial color pickers to match template colors when template changes
            $('#nameColorPicker').val(nameColor);
            $('#noteColorPicker').val(noteColor);
            
            $('#displayName')
                .text(userName)
                .css({
                    'color': nameColor,
                    'text-shadow': 'none',
                    'font-size': textSettings.name.size + 'px',
                    'transform': `translate(${textSettings.name.left}px, ${textSettings.name.top}px)`,
                    'font-family': 'Ekushey Aloucik 16-11-2018'
                });

            $('#displayNote')
                .text(userNote)
                .css({
                    'color': noteColor,
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
            textSettings: textSettings,
            customColors: customColors
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
            // Higher resolution dimensions
            const width = 1080;  // 3x the display width
            const height = 1200; // 3x the display height
            
            // Get the card container element
            const cardContainer = document.querySelector('.card-container');
            
            // Create canvas with higher resolution dimensions
            html2canvas(cardContainer, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                width: width / 3,  // Original width (scaled up later)
                height: height / 3, // Original height (scaled up later)
                scale: 3,           // Higher scale factor for better quality
                imageTimeout: 0,
                logging: false,
                renderScale: 2,     // Additional rendering scale
                onclone: function(clonedDoc) {
                    // Ensure text positioning matches display
                    const clonedContainer = clonedDoc.querySelector('.card-container');
                    const clonedName = clonedDoc.querySelector('#displayName');
                    const clonedNote = clonedDoc.querySelector('#displayNote');
                    
                    // Maintain text styles with enhanced rendering
                    clonedContainer.style.width = (width / 3) + 'px';
                    clonedContainer.style.height = (height / 3) + 'px';
                    
                    // Apply current template colors or custom colors
                    const template = templates[currentTemplate];
                    clonedName.style.color = customColors.name || template.textColor;
                    clonedNote.style.color = customColors.note || template.noteColor;
                    
                    // Apply position and size settings
                    clonedName.style.fontSize = textSettings.name.size + 'px';
                    clonedName.style.transform = `translate(${textSettings.name.left}px, ${textSettings.name.top}px)`;
                    clonedName.style.textRendering = 'optimizeLegibility';
                    clonedName.style.fontSmooth = 'always';
                    clonedName.style.webkitFontSmoothing = 'antialiased';
                    
                    clonedNote.style.fontSize = textSettings.note.size + 'px';
                    clonedNote.style.transform = `translate(${textSettings.note.left}px, ${textSettings.note.top}px)`;
                    clonedNote.style.textRendering = 'optimizeLegibility';
                    clonedNote.style.fontSmooth = 'always';
                    clonedNote.style.webkitFontSmoothing = 'antialiased';
                }
            }).then(function(canvas) {
                // Create a high-resolution canvas
                const hdCanvas = document.createElement('canvas');
                const hdContext = hdCanvas.getContext('2d');
                
                // Set HD canvas dimensions
                hdCanvas.width = width;
                hdCanvas.height = height;
                
                // Enable image smoothing for better quality
                hdContext.imageSmoothingEnabled = true;
                hdContext.imageSmoothingQuality = 'high';
                
                // Draw the original canvas onto the HD canvas, scaling it up
                hdContext.drawImage(canvas, 0, 0, width, height);
                
                // Convert to highest quality PNG
                const dataUrl = hdCanvas.toDataURL('image/png', 1.0);
                
                // Create download link
                const link = document.createElement('a');
                link.download = 'eid-card-hd.png';
                link.href = dataUrl;
                
                // Trigger download
                link.click();
                
                // Reset button state
                $btn.prop('disabled', false);
                $btn.html('<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white"></path></svg><span>ডাউনলোড</span>');
            });
        } catch (error) {
            console.error('Error:', error);
            alert('দুঃখিত, ডাউনলোড করা যায়নি। আবার চেষ্টা করুন।');
            
            // Reset button state
            $btn.prop('disabled', false);
            $btn.html('<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white"></path></svg><span>ডাউনলোড</span>');
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

    // Template slider functionality
    $(document).ready(function() {
        // Variables for slider
        let currentSlide = 0;
        const slidesCount = $('.template-item').length;
        let visibleSlides = getVisibleSlides();
        let maxSlideIndex = slidesCount - visibleSlides;
        
        // Initialize slider
        updateTemplateCounter();
        
        // Get number of visible slides based on screen width
        function getVisibleSlides() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            return 3;
        }
        
        // Update slider position
        function updateSliderPosition() {
            const slideWidth = $('.template-item').outerWidth(true);
            $('.template-slider-container').css('transform', `translateX(-${currentSlide * slideWidth}px)`);
        }
        
        // Update template counter display
        function updateTemplateCounter() {
            $('#templateCounter').text(`${currentTemplate + 1}/${slidesCount}`);
        }
        
        // Slider buttons
        $('#sliderPrevBtn').click(function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSliderPosition();
            }
        });
        
        $('#sliderNextBtn').click(function() {
            if (currentSlide < maxSlideIndex) {
                currentSlide++;
                updateSliderPosition();
            }
        });
        
        // Update visible slides count when window is resized
        $(window).resize(function() {
            const newVisibleSlides = getVisibleSlides();
            if (visibleSlides !== newVisibleSlides) {
                visibleSlides = newVisibleSlides;
                maxSlideIndex = slidesCount - visibleSlides;
                if (currentSlide > maxSlideIndex) {
                    currentSlide = maxSlideIndex;
                    updateSliderPosition();
                }
            }
        });
        
        // Template selection - modify the existing click handler
        $('.template-item').click(function() {
            const templateId = parseInt($(this).data('template'));
            currentTemplate = templateId;
            
            $('.template-item').removeClass('active');
            $(this).addClass('active');
            
            // Reset custom colors when switching templates
            customColors.name = null;
            customColors.note = null;
            
            // Update template counter
            updateTemplateCounter();
            
            updateCard();
        });
        
        // Modify the existing updateTemplateSelection function
        function updateTemplateSelection() {
            $('.template-item').removeClass('active');
            const $activeTemplate = $(`.template-item[data-template="${currentTemplate}"]`);
            $activeTemplate.addClass('active');
            
            // Calculate which slide contains the active template
            const slideWidth = $('.template-item').outerWidth(true);
            const activeIndex = $activeTemplate.index();
            
            // Adjust current slide to make the active template visible
            if (activeIndex < currentSlide) {
                currentSlide = activeIndex;
            } else if (activeIndex >= currentSlide + visibleSlides) {
                currentSlide = Math.min(activeIndex - visibleSlides + 1, maxSlideIndex);
            }
            
            updateSliderPosition();
            updateTemplateCounter();
        }
        
        // Update the existing navigation buttons to include slider update
        $('#prevBtn, #nextBtn').click(function() {
            updateTemplateCounter();
        });
    });
});