
    $(document).ready(function() {
        // Fetch the JSON data using Ajax
        $.ajax({
            url: 'pricing-section.json', // Path to the JSON file
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                // Loop through each plan and append it to the pricing section
                $.each(data.plans, function(index, plan) {
                    var planHTML = '<div class="bg-white p-6 rounded-lg shadow-md border';

                    // Add border for the "Most Popular" plan
                    if (plan.badge === "Most Popular") {
                        planHTML += ' border-2 border-[#673ee5] relative">';
                        planHTML += '<span class="absolute top-0 left-1/2 -translate-x-1/2 bg-[#673ee5] text-white text-xs font-bold px-3 py-1 rounded-b">' + plan.badge + '</span>';
                    } else {
                        planHTML += '">';
                    }

                    planHTML += '<h3 class="text-xl font-bold mt-6 mb-4">' + plan.name + '</h3>';
                    planHTML += '<p class="text-3xl font-bold text-[#673ee5]">' + plan.price + '<span class="text-sm text-gray-600">/Year</span></p>';
                    planHTML += '<ul class="text-left mt-4 space-y-2">';
                    
                    // Loop through the features of the plan
                    $.each(plan.features, function(i, feature) {
                        planHTML += '<li>' + feature + '</li>';
                    });

                    planHTML += '</ul>';
                    planHTML += '<a href="' + plan.buttonLink + '" class="block mt-6 bg-[#673ee5] text-white px-4 py-2 rounded hover:bg-blue-500">' + plan.buttonText + '</a>';
                    planHTML += '</div>';

                    // Append the plan to the pricing section
                    $('#pricing-plans').append(planHTML);
                });
            },
            error: function() {
                alert("Error loading the pricing data.");
            }
        });
    });