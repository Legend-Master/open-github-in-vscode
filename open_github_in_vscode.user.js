// @ts-check
// ==UserScript==
// @name        GitHub in VSCode desktop
// @namespace   https://github.com/Legend-Master
// @version     0.0.18
// @author      Tony
// @description A userscript that adds a button to open a repo in VSCode desktop using Remote Repositories and GitHub Repositories extensions
// @icon        https://github.githubassets.com/pinned-octocat.svg
// @homepage    https://github.com/Legend-Master/open-github-in-vscode
// @downloadURL https://github.com/Legend-Master/open-github-in-vscode/raw/main/open_github_in_vscode.user.js
// @updateURL   https://github.com/Legend-Master/open-github-in-vscode/raw/main/open_github_in_vscode.user.js
// @supportURL  https://github.com/Legend-Master/open-github-in-vscode/issues
// @match       https://github.com/*
// @grant       none
// ==/UserScript==

;(function () {
	'use strict'

	/** @type {HTMLAnchorElement | undefined} */
	let vscodeButton

	/**
	 * @param {Element} siblingElement
	 */
	function addButton(siblingElement) {
		if (vscodeButton?.isConnected) {
			return
		}

		const logoStyle = `style="
			height: 1.1em;
			width: 1.1em;
			vertical-align: text-bottom;
			margin-right: 0.1em;
		"`
		const vscodeLogo = `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" ${logoStyle}>
		<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z" fill="white"/>
		</mask>
		<g mask="url(#mask0)">
		<path d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z" fill="#0065A9"/>
		<g filter="url(#filter0_d)">
		<path d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z" fill="#007ACC"/>
		</g>
		<g filter="url(#filter1_d)">
		<path d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z" fill="#1F9CF0"/>
		</g>
		<g style="mix-blend-mode:overlay" opacity="0.25">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z" fill="url(#paint0_linear)"/>
		</g>
		</g>
		<defs>
		<filter id="filter0_d" x="-8.39411" y="15.8291" width="116.727" height="92.2456" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
		<feOffset/>
		<feGaussianBlur stdDeviation="4.16667"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
		<feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
		</filter>
		<filter id="filter1_d" x="60.4167" y="-8.07558" width="47.9167" height="116.151" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
		<feOffset/>
		<feGaussianBlur stdDeviation="4.16667"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
		<feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
		</filter>
		<linearGradient id="paint0_linear" x1="49.9392" y1="0.257812" x2="49.9392" y2="99.7423" gradientUnits="userSpaceOnUse">
		<stop stop-color="white"/>
		<stop offset="1" stop-color="white" stop-opacity="0"/>
		</linearGradient>
		</defs>
		</svg>
		`

		vscodeButton = document.createElement('a')
		// vscodeButton.className = siblingElement.className
		vscodeButton.className = 'types__StyledButton-sc-ws60qy-0 hpNARH'
		vscodeButton.href = `vscode://ms-vscode.remote-repositories/open?url=${window.location}`
		vscodeButton.innerHTML = `${vscodeLogo} Open in vscode`
		siblingElement.before(vscodeButton)

		// Refined GitHub support
		// They're using empty css animation and animationstart event to observe elements
		// Event loop: here -> requestAnimationFrame -> animation -> animationstart event handler -> requestAnimationFrame
		// So we need 2 requestAnimationFrame
		function refinedGithub() {
			// More options is a button
			if (
				vscodeButton?.isConnected &&
				siblingElement instanceof HTMLAnchorElement &&
				siblingElement.firstChild instanceof SVGElement
			) {
				vscodeButton.innerHTML = vscodeLogo
				vscodeButton.ariaLabel = 'Open in vscode'
				vscodeButton.className = siblingElement.className
				return true
			}
		}
		refinedGithub() ||
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					refinedGithub()
				})
			})
	}

	function tryAddButton() {
		const goToFile = document.querySelector("button[data-hotkey='t,Shift+T']")
		const container = goToFile?.parentElement
		// Not the one above repo file tree panel
		if (container && container.id !== 'repos-file-tree') {
			addButton(container)
			return true
		}

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const firstActionButton = document.querySelector(
					'#StickyHeader div.d-flex.gap-2 button:not([hidden])'
				)
				if (firstActionButton) {
					addButton(firstActionButton)
					return true
				}
			})
		})
	}

	// For initial page load
	tryAddButton()

	/** @type {MutationObserver | undefined} */
	let observer
	// For soft page navigation (no browser reload, so this script won't rerun)
	document.addEventListener('turbo:load', () => {
		observer?.disconnect()
		if (tryAddButton()) {
			return
		}

		observer = new MutationObserver((mutationList, observer) => {
			tryAddButton()
			// if (tryAddButton()) {
			// 	observer.disconnect()
			// }
		})
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		})
	})
})()
