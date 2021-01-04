function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var app = new Vue({
		el: '#app',
		data: {
			en: true,
			year: new Date().getFullYear(),
			dir: 'portrait',
			num_pics: {
				'portrait': 20,
				'landscape': 19,
				'documentary': 20,
			}
		},
		methods: {
			toggleLanguage: function (evt) {
				this.en = !this.en;
				window.sessionStorage.en = this.en;
				if(this.en) {
					$('.owl-prev').text('prev');
					$('.owl-next').text('next')
				} else {
					$('.owl-prev').text('上一张');
					$('.owl-next').text('下一张')
				}
			},
			changePicType: function(val) {
				this.dir = val;
				window.sessionStorage.dir = val;
				try {
					$('.testimonial-slides').owlCarousel('destroy');
					this.dir = val;
					window.sessionStorage.dir = val;
					this.$nextTick(() => {
						$('.testimonial-slides').owlCarousel({
							items: 1,
							loop: true,
							dots: true,
							autoplay: true,
							autoplayTimeout: 3000,
							smartSpeed: 300,
							animateIn: 'fadeIn',
							animateOut: 'fadeOut',
							lazyLoad: true,
						});
					});
				}
				catch(err) {
					console.log(err)
				}
			}
		},
		created() {
			if(typeof(getUrlVars().lang) != "undefined") {
				this.en = (getUrlVars().lang === 'en');
			}
			else if(typeof(window.sessionStorage.en) !== "undefined") {
				this.en = window.sessionStorage.en === 'true';
			} else {
				this.en = true;
			}
			if(window.sessionStorage.dir != null) {
				this.dir = window.sessionStorage.dir;
			}
		}
	})