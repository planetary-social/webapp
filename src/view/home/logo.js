import { html } from 'htm/preact'

function Logo () {
    return html`<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.28717 25.5001L4.49095 19.5651H9.79857C13.9564 19.5651 16.578 17.1363 16.578 13.2283C16.578 9.26557 13.9564 6.83679 9.79857 6.83679H0.28717V25.5001Z" fill="url(#paint0_linear_25_104)"/>
        <path d="M20.7725 19.1633L16.5687 13.2283H11.2611C7.10332 13.2283 4.4817 10.7995 4.4817 6.89153C4.4817 2.92878 7.10332 0.5 11.2611 0.5H20.7725V19.1633Z" fill="url(#paint1_linear_25_104)"/>
        <path d="M9.78941 6.83667H4.4818C4.4818 6.85493 4.4818 6.87319 4.4818 6.89145C4.4818 10.7903 7.10341 13.2282 11.2612 13.2282H16.5688C16.5688 9.26545 13.9472 6.83667 9.78941 6.83667Z" fill="url(#paint2_linear_25_104)"/>
        <defs>
        <linearGradient id="paint0_linear_25_104" x1="0.287171" y1="25.5001" x2="20.8185" y2="16.0431" gradientUnits="userSpaceOnUse">
        <stop stop-color="#36F0EA"/>
        <stop offset="0.732944" stop-color="#8474EA"/>
        </linearGradient>
        <linearGradient id="paint1_linear_25_104" x1="4.98612" y1="13.135" x2="20.6802" y2="0.386383" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFC200"/>
        <stop offset="0.644395" stop-color="#FF3E7A"/>
        </linearGradient>
        <linearGradient id="paint2_linear_25_104" x1="4.4818" y1="13.2282" x2="16.5291" y2="6.7626" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFE593"/>
        <stop offset="1" stop-color="#FFC200"/>
        </linearGradient>
        </defs>
    </svg>`
}

module.exports = Logo
