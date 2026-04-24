document.addEventListener('DOMContentLoaded', () => {

    // 1. FIXED PRELOADER LOGIC
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 800); 
    }

    // 2. DARK MODE TOGGLE
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 3. NAVBAR SCROLL EFFECT
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // 4. GALLERY FILTERING SYSTEM
    const filterBtns = document.querySelectorAll('.filter-btn');
    const foodItems = document.querySelectorAll('.food-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            foodItems.forEach(item => {
                item.style.animation = 'none';
                item.style.display = 'none';
                
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    }, 10);
                }
            });
        });
    });

    // 5. SCROLL REVEAL ANIMATION
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', reveal);
    reveal(); 

    // 6. FAB MENU TOGGLE
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.querySelector('.fab-main');

    if (fabMain && fabContainer) {
        fabMain.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
        });
    }

    // 7. SMART MODAL
    const modal = document.getElementById('food-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');

    const foodDatabase = {
        "Laing": {
            ingredients: "Dried taro leaves (gabi), thick coconut cream (kakang gata), succulent pork belly, ginger, and siling labuyo for that signature kick.",
            images: ["https://kusinasecrets.com/wp-content/uploads/2024/11/u3317447599_httpss.mj_.runrzJY5AdW6LQ_top_down_view_of_Authent_136cae8e-1d96-4b4b-8417-693c972281cd_2.jpg"]
        },
        "Adobo": {
            ingredients: "Pork belly or Chicken marinated and simmered in soy sauce, vinegar, garlic, and siling labuyo for chili.",
            images: ["https://panlasangpinoy.com/wp-content/uploads/2025/12/spicy-pork-ribs-adobo.jpg", "https://images.yummy.ph/yummy/uploads/2023/03/chicken-adobo640.jpg"]
        },
        "Tinola": {
            ingredients: "Chicken, green papaya or sayote, chili leaves, ginger broth, and long green pepper.",
            images: ["https://panlasangpinoy.com/wp-content/uploads/2018/11/Chicken-Tinola-Soup-Recipe.jpg"] 
        },
        "Paksiw": {
            ingredients: "Pork or Fish cooked in vinegar, garlic, onions, and spices.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOw-y0JC-MIkqLzWGZTivWX8SK3TBmo5GuSQ&s", "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1q6QwivAcDKUx8-3cOGPaVHesbjF6qNRVcj9wvtLW6H00-ceLKGX3CqPG7hyphenhyphenrvwEW-RMOx8yHvXKqHUjiIg6pE6PVgIPymRS2jfYO0SWJkQjdMWoCUGZIiwR0HRkaH4svuORJDc_1faw/s1600/tilapia+paksiw.jpg"] 
        },
        "Humba": {
            ingredients: "Pork belly, soy sauce, vinegar, and dahon ng luarel.",
            images: ["https://i.ytimg.com/vi/eBVJDIC2V8A/sddefault.jpg"] 
        },
        "Caldereta": {
            ingredients: "Beef or Pork, tomato sauce, liver spread, potatoes, carrots, and bell peppers.",
            images: ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEha8BHzkeRNPBveSpurqbJTHWeeWz-RkEv5y-lPijfmSjN5BQlW4614V3vxvJ7vAwnIZtqP20KIBC7qWjI5EKepZ2EquHj_uRsi0q67F12t-GqDYDCcKpECG1K0G6nXuMdRnj5GfiIS1IY/s1414/pork+kaldereta.JPG"] 
        },
        "Afritada": {
            ingredients: "Pork simmered in tomato sauce with potatoes, liver, carrots, and green peas.",
            images: ["https://panlasangpinoy.com/wp-content/uploads/2017/07/Afritadang-Baboy-500x485.jpg"] 
        },
        "Chopsuey": {
            ingredients: "Mixed fresh vegetables (cabbage, carrots, broccoli, bell peppers) with pork.",
            images: ["https://panlasangpinoy.com/wp-content/uploads/2021/08/Chopsuey-Panlasang-Pinoy-jpg.webp"] 
        },
        "Lasagna": {
            ingredients: "Layers of flat pasta, rich meat sauce, white cream, and melted cheese.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt4xO36M91M9NoXyVBCFChLBH4bR0qm_Ueig&s"] 
        },
        "Spaghetti": {
            ingredients: "Pasta topped with sweet-style Filipino tomato sauce, ground meat, hotdogs, and cheddar cheese.",
            images: ["https://www.kawalingpinoy.com/wp-content/uploads/2021/09/instant-pot-filipino-spaghetti-2.jpg"] 
        },
        "Aglio Olio": {
            ingredients: "Pasta tossed in olive oil, toasted garlic, red pepper flakes or red chilli, and pork giniling.",
            images: ["https://theplantbasedschool.com/wp-content/uploads/2025/12/Spaghetti-aglio-e-olio-ready-to-eat-for-a-quick-Mediterranean-style-dinner.jpg"] 
        },
        "Spicy Tuna Pasta": {
            ingredients: "Ideal pasta mixed with century tuna hot & spicy, tomatoes, butter and chilli oil.",
            images: ["https://i.ytimg.com/vi/BpXydWdcm7U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCQQ4QE58lCscZQnmo6gVglfsedDg"] 
        },
        "Carbonara": {
            ingredients: "Pasta coated in a creamy white sauce with bacon bits and cheese.",
            images: ["https://sweetandsavorymeals.com/wp-content/uploads/2023/02/chicken-carbonara.jpg"] 
        },
        "Puto Cheese & Puto Pao & Puto Flan": {
            ingredients: "For (puto cheese) Steamed all purpose flour topped with cheese. For (puto pao) stuffed with savory meat filling, salted egg and cheese on top.",
            images: ["https://www.kawalingpinoy.com/wp-content/uploads/2014/11/cheese-puto-2-1-500x500.jpg", "https://yummykitchentv.com/wp-content/uploads/2021/02/puto-pao-recipe-1024x773.jpg", "https://www.nestlegoodnes.com/ph/sites/default/files/styles/1_1_768px_width/public/srh_recipes/33a88a3742b371f891e5e9d462492603.jpg.webp?itok=6pV9GKrg"] 
        },
        "Kutsinta": {
            ingredients: "Sticky and chewy steamed all purpose flour and cassava flour served with freshly grated coconut.",
            images: ["https://panlasangpinoy.com/wp-content/uploads/2015/02/kutsinta-1024x768.jpg"] 
        },
        "Takoyaki": {
            ingredients: "Special batter, diced sweet ham, quick-melt cheese. Topped with Japanese mayo and takoyaki sauce.",
            images: ["https://www.thedailymeal.com/img/gallery/what-exactly-is-takoyaki-and-what-usually-goes-into-it/l-intro-1719843074.jpg"] 
        },
        "Butchi": {
            ingredients: "Deep-fried glutinous rice balls coated in sesame seeds with cheese filling.",
            images: ["https://yummykitchentv.com/wp-content/uploads/2020/10/buchi-recipe-1024x731.jpg"] 
        },
        "Palitaw": {
            ingredients: "Chewy sweet all purpose flour and cassava flour coated in grated coconut, sesame seeds, and sugar.",
            images: ["https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2022-12-patilaw%2Fpalitaw_005"] 
        },
        "Macapuno": {
            ingredients: "Sweetened mutant coconut strings preserved in thick syrup.",
            images: ["https://theunlikelybaker.com/wp-content/uploads/2025/07/Macapuno-Balls-Feature-2.jpg"] 
        },
        "Graham": {
            ingredients: "Layers of graham crackers, sweetened cream, and fresh mangoes.",
            images: ["https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/tk%2Fphoto%2F2025%2F05-2025%2F2025-05-filipino-mango-royale%2Ffilipino-mango-royale-566"] 
        },
        "Choco Mousse": {
            ingredients: "Light, fluffy, and decadent chocolate dessert made with dark chocolate and cream.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1nVZWKdhiqMd6h-ZDY7JJc-UW_XGMWQFzQ&s"] 
        },
         "Ice cream": {
            ingredients: "Evaporada, All purpose cream, Condense, and Chocolates for toppings.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsG3t0eKU1NTzfvgYmogDfRD3VvzTmPIavRg&s"] 
        }

    };

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const foodName = btn.getAttribute('data-id');
            const foodData = foodDatabase[foodName] || {
                ingredients: "Chef's secret ingredients.",
                images: ["https://via.placeholder.com/500x400?text=No+Photo"]
            };

            let imagesHTML = "";
            foodData.images.forEach((imgSrc, index) => {
                imagesHTML += `<img src="${imgSrc}" alt="${foodName} - View ${index + 1}" style="flex: 1; min-width: 250px; max-height: 300px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">`;
            });

            if (modalBody) {
                modalBody.innerHTML = `
                    <div class="modal-content-wrapper" style="text-align: left;">
                        <div class="modal-images-container" style="display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                            ${imagesHTML} 
                        </div>
                        <h3 style="color: var(--primary); font-size: 1.8rem; margin-bottom: 10px;">${foodName}</h3>
                        <p style="font-size: 1rem; line-height: 1.5; color: var(--text-dark);">
                            <strong>Main Ingredients:</strong><br> ${foodData.ingredients}
                        </p>
                    </div>
                `;
            }
            
            if (modal) {
                modal.style.display = 'flex';
                const modalContent = modal.querySelector('.modal-content');
                if(modalContent) modalContent.style.animation = 'fadeIn 0.3s ease forwards';
            }
        });
    });

    if (closeBtn && modal) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    
    window.onclick = (e) => { 
        if (e.target == modal) modal.style.display = 'none'; 
    };

    // 8. BAGONG CODE PARA SA DOTS (SLIDER)
    const slider = document.getElementById('aboutSlider');
    const dots = document.querySelectorAll('.dot');

    if (slider && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const scrollAmount = slider.offsetWidth * index;
                slider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        });

        slider.addEventListener('scroll', () => {
            const index = Math.round(slider.scrollLeft / slider.offsetWidth);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
    }

});