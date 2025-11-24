const pre = `https://www.brmnow.com`;
// const pre = `http://127.0.0.1:3001`;


const trackDataUrl = `https://www.brmnow.com/music`;
const publicPlaylistUrl = `${pre}/music/playlists`;

const saveLength = 22;
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playlist = document.getElementById('playlist');
const nowPlaying = document.getElementById('now-playing');
const publicPlaylist = document.getElementById('publicPlaylist');
let totalSongs = document.getElementById('total-songs');

let myWidth = '25px'; let myHeight = '25px'; let myColorWhite = "#f6f6f6ff"

let playlistAddIcon = `<svg fill="#0d0d0ebc"  width="40px" height="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M93.1,325.8V139.6H46.5C20.9,139.6,0,160.5,0,186.2v279.3C0,491.1,20.9,512,46.5,512h279.3c25.7,0,46.5-20.9,46.5-46.5 v-46.5H186.2C134.8,418.9,93.1,377.2,93.1,325.8z M465.5,0H186.2c-25.7,0-46.5,20.9-46.5,46.5v279.3c0,25.7,20.9,46.5,46.5,46.5 h279.3c25.7,0,46.5-20.9,46.5-46.5V46.5C512,20.9,491.1,0,465.5,0z M442.2,209.5h-93.1v93.1h-46.5v-93.1h-93.1v-46.5h93.1V69.8h46.5 v93.1h93.1V209.5z"></path> </g></svg>`
let whiteAddPlaylist = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="${myColorWhite}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960 293.333v160H186.667C171.939 453.333 160 465.272 160 480v1253.33c0 14.73 11.939 26.67 26.667 26.67H1440c14.73 0 26.67-11.94 26.67-26.67V960h160v773.33c0 103.1-83.58 186.67-186.67 186.67H186.667C83.573 1920 0 1836.43 0 1733.33V480c0-103.093 83.573-186.667 186.667-186.667H960ZM586.667 800 1120 1120l-533.333 320V800ZM1626.67 0v293.333H1920v160h-293.33v293.334h-160V453.333h-293.34v-160h293.34V0h160Z" fill-rule="evenodd"></path> </g></svg>`
let whiteDeleteIcon = `<svg width="${myWidth}" height="${myHeight}" viewBox="0 0 24 24" fill="${myColorWhite}" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="${myColorWhite}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V17" stroke="${myColorWhite}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
let editIcon = `<svg width="${myWidth}" height="${myHeight}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="${myColorWhite}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
let shareIcon = `<svg fill="#000000" width="${myWidth}" height="${myHeight}" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M28.183 29.668h-26v-20h8.050l2.023-1.948-0.052-0.052h-10.021c-1.105 0-2 0.896-2 2v20c0 1.105 0.895 2 2 2h26c1.105 0 2-0.895 2-2v-15.646l-2 1.909v13.737zM8.442 21.668l2.015-0c1.402-7.953 8.329-14 16.684-14 0.351 0 0.683 0.003 1.019 0.005l-3.664 3.664c-0.39 0.39-0.39 1.024 0 1.414 0.195 0.196 0.452 0.293 0.708 0.293s0.511-0.098 0.706-0.293l5.907-6.063-5.907-6.064c-0.39-0.391-1.023-0.391-1.414 0-0.39 0.391-0.39 1.024 0 1.414l3.631 3.63c-0.314-0-0.624-0.002-0.944-0.002-9.47 0-17.299 6.936-18.741 16.001z"></path> </g></svg>`
let musicIcon = `<svg fill="#30052eff" width="25px" height="25px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.995 8.167c0-0.984-0.083-1.964-0.318-2.922-0.422-1.745-1.417-3.078-2.906-4.057-0.766-0.5-1.609-0.807-2.505-0.969-0.688-0.125-1.385-0.182-2.083-0.198-0.052-0.005-0.109-0.016-0.167-0.021h-16.031c-0.203 0.016-0.406 0.026-0.609 0.036-0.995 0.057-1.984 0.161-2.922 0.536-1.781 0.703-3.068 1.932-3.818 3.703-0.26 0.599-0.391 1.234-0.484 1.88-0.078 0.521-0.12 1.047-0.135 1.573 0 0.042-0.010 0.083-0.010 0.125v16.297c0.010 0.188 0.021 0.375 0.031 0.563 0.068 1.089 0.208 2.167 0.667 3.167 0.865 1.891 2.318 3.135 4.313 3.734 0.557 0.172 1.141 0.25 1.724 0.302 0.74 0.073 1.479 0.083 2.219 0.083h14.708c0.698 0 1.396-0.047 2.094-0.135 1.099-0.141 2.13-0.464 3.063-1.078 1.12-0.74 1.964-1.719 2.505-2.943 0.25-0.563 0.391-1.161 0.495-1.766 0.151-0.901 0.182-1.813 0.182-2.724-0.005-5.063 0-10.125-0.005-15.188zM23.432 13.484v7.615c0 0.557-0.078 1.104-0.328 1.609-0.385 0.786-1.010 1.281-1.849 1.521-0.464 0.135-0.943 0.208-1.427 0.229-1.266 0.063-2.365-0.797-2.589-2.047-0.193-1.031 0.302-2.167 1.385-2.698 0.427-0.208 0.891-0.333 1.354-0.427 0.505-0.109 1.010-0.208 1.51-0.323 0.37-0.083 0.609-0.307 0.682-0.688 0.021-0.083 0.026-0.172 0.026-0.255 0-2.422 0-4.844 0-7.26 0-0.083-0.016-0.167-0.036-0.245-0.052-0.203-0.198-0.323-0.406-0.313-0.214 0.010-0.422 0.047-0.63 0.089-1.016 0.198-2.031 0.401-3.042 0.609l-4.932 0.995c-0.021 0.005-0.047 0.016-0.068 0.016-0.37 0.104-0.5 0.271-0.516 0.656-0.005 0.057 0 0.115 0 0.172-0.005 3.469 0 6.938-0.005 10.406 0 0.563-0.063 1.115-0.286 1.635-0.37 0.854-1.026 1.391-1.911 1.646-0.469 0.135-0.948 0.214-1.438 0.229-1.276 0.047-2.339-0.802-2.557-2.057-0.188-1.083 0.307-2.25 1.536-2.771 0.479-0.198 0.974-0.307 1.479-0.411 0.38-0.078 0.766-0.156 1.146-0.234 0.51-0.109 0.776-0.432 0.802-0.953v-0.198c0-3.948 0-7.896 0-11.844 0-0.167 0.021-0.333 0.057-0.495 0.094-0.38 0.365-0.599 0.729-0.688 0.339-0.089 0.688-0.151 1.031-0.224 0.979-0.198 1.953-0.396 2.932-0.589l3.026-0.615c0.896-0.177 1.786-0.359 2.682-0.536 0.292-0.057 0.589-0.12 0.885-0.141 0.411-0.036 0.698 0.224 0.74 0.641 0.010 0.099 0.016 0.198 0.016 0.297 0 2.547 0 5.094 0 7.641z"></path> </g></svg>`
let playlistPlayIcon = `<svg width="${myWidth}" height="${myHeight}" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play_plus_focus [#959]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-100.000000, -3959.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M51.424,3812.332 L56.068,3810.155 C56.835,3809.795 56.835,3808.704 56.068,3808.344 L51.424,3806.167 C50.761,3805.857 50,3806.341 50,3807.073 L50,3811.427 C50,3812.159 50.761,3812.643 51.424,3812.332 L51.424,3812.332 Z M62,3813 L64,3813 L64,3805 L62,3805 L62,3813 Z M64,3817 L64,3816 C64,3815.447 63.552,3815 63,3815 C62.447,3815 62,3815.447 62,3816 L62,3817 L61,3817 C60.447,3817 60,3817.447 60,3818 C60,3818.552 60.447,3819 61,3819 L62,3819 L62,3820 C62,3820.552 62.447,3821 63,3821 C63.552,3821 64,3820.552 64,3820 L64,3819 L65,3819 C65.552,3819 66,3818.552 66,3818 C66,3817.447 65.552,3817 65,3817 L64,3817 Z M62,3803 L64,3803 L64,3801 C64,3799.895 63.104,3799 62,3799 L60,3799 L60,3801 L61,3801 C61.552,3801 62,3801.447 62,3802 L62,3803 Z M44,3813 L46,3813 L46,3805 L44,3805 L44,3813 Z M46,3815 L44,3815 L44,3817 C44,3818.104 44.895,3819 46,3819 L48,3819 L48,3817 L47,3817 C46.447,3817 46,3816.552 46,3816 L46,3815 Z M44,3803 L46,3803 L46,3802 C46,3801.447 46.447,3801 47,3801 L48,3801 L48,3799 L46,3799 C44.895,3799 44,3799.895 44,3801 L44,3803 Z M50,3819 L58,3819 L58,3817 L50,3817 L50,3819 Z M50,3801 L58,3801 L58,3799 L50,3799 L50,3801 Z" id="play_plus_focus-[#959]"> </path> </g> </g> </g> </g></svg>`
let moreIcon = `<svg width="${myWidth}" height="${myHeight}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / More_Grid_Small"> <g id="Vector"> <path d="M14 15C14 15.5523 14.4477 16 15 16C15.5523 16 16 15.5523 16 15C16 14.4477 15.5523 14 15 14C14.4477 14 14 14.4477 14 15Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 15C8 15.5523 8.44772 16 9 16C9.55228 16 10 15.5523 10 15C10 14.4477 9.55228 14 9 14C8.44772 14 8 14.4477 8 15Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 9C14 9.55228 14.4477 10 15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9C8 9.55228 8.44772 10 9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`
let expandUpIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1920 1694.176v112.942H0v-112.942h1920ZM960.056 371.918l378.692 378.804-79.85 79.85-242.37-242.372v654.155H903.585V588.2L661.1 830.572l-79.85-79.85 378.805-378.804Zm790.589-258.974H169.468C75.953 112.944.056 188.953.056 282.355v1185.883h1920V282.355c0-93.402-76.009-169.411-169.411-169.411Z" fill-rule="evenodd"></path> </g></svg>`
let expandDownIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m.08 568.063 176.13-176.13 783.988 783.864 783.74-783.864 176.129 176.13-959.87 960.118z" fill-rule="evenodd"></path> </g></svg>`
let expandIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 512 512" id="_09_Expand" data-name="09 Expand" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_24" data-name="Group 24"> <g id="Group_23" data-name="Group 23"> <path id="Path_14" data-name="Path 14" d="M178.375,287.812,73.094,393.094,32,352A31.981,31.981,0,0,0,0,384v96a31.981,31.981,0,0,0,32,32h96a31.981,31.981,0,0,0,32-32l-41.094-41.062L224.187,333.626ZM480,0H384a31.991,31.991,0,0,0-32,32l41.094,41.094L287.812,178.375l45.812,45.812L438.905,118.921,480,160a31.981,31.981,0,0,0,32-32V32A31.991,31.991,0,0,0,480,0Zm0,352-41.094,41.094L333.625,287.812l-45.812,45.812L393.094,438.936,352,480a31.981,31.981,0,0,0,32,32h96a31.981,31.981,0,0,0,32-32V384A31.981,31.981,0,0,0,480,352ZM160,32A31.991,31.991,0,0,0,128,0H32A31.991,31.991,0,0,0,0,32v96a31.981,31.981,0,0,0,32,32l41.094-41.078L178.375,224.188l45.812-45.812L118.906,73.094Z" fill-rule="evenodd"></path> </g> </g> </g></svg>`
let playIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play</title> <path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"></path> </g></svg>`
let pauseIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 1H2V15H7V1Z" fill="${myColorWhite}"></path> <path d="M14 1H9V15H14V1Z" ></path> </g></svg>`
let nextIcon = `<svg  fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 -2 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>next [#998]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-144.000000, -3805.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M99.684,3649.69353 L95.207,3652.82453 C94.571,3653.25353 94,3652.84553 94,3652.13153 L94,3650.14053 L89.78,3652.82453 C89.145,3653.25353 88,3652.84553 88,3652.13153 L88,3645.86853 C88,3645.15453 89.145,3644.74653 89.78,3645.17453 L94,3647.85953 L94,3645.86853 C94,3645.15453 94.571,3644.74653 95.207,3645.17453 L99.516,3648.30653 C100.03,3648.65353 100.198,3649.34653 99.684,3649.69353" id="next-[#998]"> </path> </g> </g> </g> </g></svg>`
let prevIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 -2 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>previous [#999]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-104.000000, -3805.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M59.9990013,3645.86816 L59.9990013,3652.13116 C59.9990013,3652.84516 58.8540013,3653.25316 58.2180013,3652.82516 L53.9990013,3650.14016 L53.9990013,3652.13116 C53.9990013,3652.84516 53.4260013,3653.25316 52.7900013,3652.82516 L48.4790013,3649.69316 C47.9650013,3649.34616 47.7980013,3648.65316 48.3120013,3648.30616 L52.7900013,3645.17516 C53.4260013,3644.74616 53.9990013,3645.15416 53.9990013,3645.86816 L53.9990013,3647.85916 L58.2180013,3645.17516 C58.8540013,3644.74616 59.9990013,3645.15416 59.9990013,3645.86816" id="previous-[#999]"> </path> </g> </g> </g> </g></svg>`
let addPlaylist = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="play"></g> <g id="stop"></g> <g id="pause"></g> <g id="replay"></g> <g id="next"></g> <g id="Layer_8"></g> <g id="search"></g> <g id="list"></g> <g id="love"></g> <g id="menu"></g> <g id="add"> <g> <g> <path d="M4.743,2.496C4.266,2.223,4,2.45,4,3v26c0,0.55,0.266,0.776,0.743,0.504l22.701-13.008 c0.478-0.273,0.509-0.719,0.031-0.992L4.743,2.496z"></path> <path d="M4.385,30.619L4.385,30.619C3.718,30.619,3,30.112,3,29V3c0-1.113,0.718-1.62,1.385-1.62c0.28,0,0.567,0.083,0.854,0.248 l22.733,13.008c0.538,0.308,0.846,0.798,0.846,1.347c0,0.559-0.32,1.063-0.878,1.382L5.24,30.371 C4.952,30.536,4.665,30.619,4.385,30.619z M5.003,3.797L5,28.203l21.314-12.212L5.003,3.797z"></path> </g> <g> <line x1="28" x2="20" y1="26" y2="26"></line> <path d="M28,27h-8c-0.552,0-1-0.447-1-1s0.448-1,1-1h8c0.552,0,1,0.447,1,1S28.552,27,28,27z"></path> </g> <g> <line x1="24" x2="24" y1="22" y2="30"></line> <path d="M24,31c-0.552,0-1-0.447-1-1v-8c0-0.553,0.448-1,1-1s1,0.447,1,1v8C25,30.553,24.552,31,24,31z"></path> </g> </g> </g> <g id="headset"></g> <g id="random"></g> <g id="music"></g> <g id="setting"></g> <g id="Layer_17"></g> <g id="Layer_18"></g> <g id="Layer_19"></g> <g id="Layer_20"></g> <g id="Layer_21"></g> <g id="Layer_22"></g> <g id="Layer_23"></g> <g id="Layer_24"></g> <g id="Layer_25"></g> <g id="Layer_26"></g> </g></svg>`;
let expandDownLineIcon = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="${myColorWhite}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="${myColorWhite}" d="M8,4 C8.55229,4 9,4.44772 9,5 L9,11.5858 L10.2929,10.2929 C10.6834,9.90237 11.3166,9.90237 11.7071,10.2929 C12.0976,10.6834 12.0976,11.3166 11.7071,11.7071 L8,15.4142 L4.29289,11.7071 C3.90237,11.3166 3.90237,10.6834 4.29289,10.2929 C4.68342,9.90237 5.31658,9.90237 5.70711,10.2929 L7,11.5858 L7,5 C7,4.44771 7.44772,4 8,4 Z M12,1 C12.5523,1 13,1.44772 13,2 C13,2.55228 12.5523,3 12,3 L4,3 C3.44772,3 3,2.55228 3,2 C3,1.44772 3.44772,1 4,1 L12,1 Z"></path> </g></svg>`
let expandUpCaret = `<svg fill="${myColorWhite}" width="${myWidth}" height="${myHeight}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 15L12 9L6 15" stroke="${myColorWhite}" stroke-width="2"></path> </g></svg>` 
let allSongsIcon = `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"  fill="${myColorWhite}" width="${myWidth}" height="${myHeight}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M443.643,0v326.061c0,23.864-26.356-3.965-78.048,1.992c-66.323,8.226-113.17,60.232-112.999,109.071 c0.17,48.874,54.068,81.851,120.338,73.616c78.156-3.75,128.035-54.562,127.855-103.445V0H443.643z"></path> <rect x="11.211" y="6.109" class="st0" width="347.942" height="59.254"></rect> <rect x="11.211" y="132.826" class="st0" width="347.942" height="59.253"></rect> <path class="st0" d="M11.211,386.257v59.246h187.8c-0.342-3.32-0.566-6.684-0.574-10.101c-0.054-17.019,3.57-33.607,10.19-49.144 H11.211z"></path> <path class="st0" d="M342.809,290.698c5.589-0.637,10.998-0.951,16.345-1.05v-30.106H11.211v59.244h255.136 C288.381,304.234,314.505,294.205,342.809,290.698z"></path> </g> </g></svg>`
let deleteIcon = `<svg width="${myWidth}" height="${myHeight}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
let saveIcon = `<svg width="${myWidth}" height="${myHeight}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-p</title><path d="M380.93,57.37A32,32,0,0,0,358.3,48H94.22A46.21,46.21,0,0,0,48,94.22V417.78A46.21,46.21,0,0,0,94.22,464H417.78A46.36,46.36,0,0,0,464,417.78V153.7a32,32,0,0,0-9.37-22.63ZM256,416a64,64,0,1,1,64-64A63.92,63.92,0,0,1,256,416Zm48-224H112a16,16,0,0,1-16-16V112a16,16,0,0,1,16-16H304a16,16,0,0,1,16,16v64A16,16,0,0,1,304,192Z" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path></g></svg>`
function shuffleCurrent(){
    
    myPlaylist(shuffleArray(songs), false)
}
// master playlist and state index
let masterPlaylist = [];
let currentSongIndex = 0;

let artists = [];
let mySongs = [];

// initial song load - song set at fetch response
let songs = 
    [
        { title : "Hard Fought Hallelujah", 
          src : "https://www.brmnow.com/web/music/Brandon Lake - Hard Fought Hallelujah.mp3", 
          artist : 'Brandon Lake' ,
          id : 18
        }
    ];



// fetch data as JSON
fetch(trackDataUrl)
.then(response => response.json()) 
.then(data => {
        songs = [];
        let playlistHtml = ``;

        data.forEach(t => {

            // masterPlaylist = data;
            let obj = { title: t.title, 
                        src: 'https://www.brmnow.com' + t.path, 
                        artist : t.artist, 
                        id: t.id
                    }
            songs.push(obj)
         
           

 
            // get artists  for filtering
            if (artists.includes(t.artist) === false){
                artists.push(t.artist)
            }

            totalSongs.innerHTML = songs.length;
        })
        
        masterPlaylist = songs
        masterPLaylistRotate(true);

        document.querySelector('li').classList.add('active')
        // document.querySelector('li[data-src="' + songs[0].src + '"]').classList.add('active');


        console.log(`${data.length} Tracks loaded!`)
})

.catch(error => {
    console.error('Error:', error)
    notify(error, 'error', 3500)
}); 

// cookies
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}
function checkCookie(cname) {
    let ck = getCookie(cname);
    if (ck != "") {
        return ck;
    } 
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// notification alert
function notify(message, type='info', duration=3000) {
    let link = `favico.ico`;
    let bgClass = 'bg-info-subtle';
    if (type === 'success') { bgClass = 'bg-success-subtle border-success'; link = `assets/icons/success.jpg` }
    if (type === 'error') { bgClass = 'bg-danger-subtle'; link = `assets/icons/error.jpg`}
    if (type === 'warning') { bgClass = 'bg-warning-subtle'; link = `assets/icons/warning.png` }
    if (type === 'info') { bgClass = 'bg-info-subtle'; link = `assets/icons/info.png` }
    if (type === 'primary') { bgClass = 'bg-primary-subtle'; link = `assets/icons/primary.png` }
    if (type === 'secondary') { bgClass = 'bg-secondary-subtle'; link = `assets/icons/light.png` }
    if (type === 'dark') { bgClass = 'bg-dark-subtle'; link = `assets/icons/dark.ico` }
    if (type === 'light') { bgClass =  'bg-light-subtle'; link = `assets/icons/light.png` }
    if (type === 'bright') { bgClass = 'bg-bright'; link = `assets/icons/bright.png` }
    if (type === 'purple') { bgClass = 'bg-purple'; link = `assets/icons/light.png` }
   
    let borderClass = (`border border-${bgClass.split('-')[1]}`)


    let note = document.createElement('div');
    let noteClass = `text-dark text-center mx-auto ${bgClass} ${borderClass} notify`;
    let messageHTML = ``
    messageHTML = `
        <div class="${noteClass}">
            <img src="${link}" style="width: 25px; height: 25px; border-radius: 50%; margin-right: 8px;">
            ${message}
        </div>
    `
    note.innerHTML = messageHTML;

    document.body.appendChild(note);
    setTimeout(() => {
        document.body.removeChild(note);
    }, duration);
}                                    

  
// playlist functions add to
function addToPlaylist(id, playlistName){
    // console.log('adding to playlist', id, playlistName)
    let tempSongs = [];
    let title = document.querySelector(`li[data-id="${id}"]`).getAttribute('data-title')
    let path = document.querySelector(`li[data-id="${id}"]`).getAttribute('data-src')
    let artist = document.querySelector(`li[data-id="${id}"]`).getAttribute('data-artist')
    let obj = { title: `${title}`, src: `${path}`, artist : `${artist}`, id: id};
    // console.log('song', obj)
    // console.log('existing cookie', getCookie(playlistName))

    if (getCookie(playlistName) != ''){
        tempSongs = JSON.parse(getCookie(playlistName));
    } 
    // console.log('temp songs', tempSongs)
    tempSongs.push(obj)
    let playListArr = (JSON.stringify(tempSongs));
    setCookie(playlistName, playListArr, 365);
}
function clearPlaylist(playlistName){
    setCookie(playlistName, '', 365);
    playlistSongs = [];
    masterPLaylistRotate()
    
}
let tempPlaylistName = '';
function handleNameChange(val){
    tempPlaylistName = document.getElementById('playlistNameInput').value;
  
}
function createNewPlaylistName(name){
    let arr = [];
    if (getCookie('newPlaylistName')) {
        arr.push((getCookie('newPlaylistName')))
    }

    arr.push(tempPlaylistName);
    setCookie('newPlaylistName', arr, 365);
    console.log('Creating playlist name ', tempPlaylistName) 
    masterPLaylistRotate()
    setPlaylists()
}
function loadAddPlaylistModal(){
    let html = 
    `
   <div class="form-floating mb-3">
        <input onkeyup="handleNameChange()" type="text" class="form-control" id="playlistNameInput" placeholder="New Playlist Name">
        <label for="playlistNameInput">New Playlist Name</label>
    </div>

    `
    
    
    ;
    let title = `Create New Playlist`;
    let body = html;
    let footer = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="button" onclick="createNewPlaylistName()" class="btn btn-success" data-bs-dismiss="modal">Create</button>`;
    let size = 'small';
    let type = 'purple'
    setModal(title, body, footer, type, size)

}

// returns arr of playlist from cookies
function userPlaylistNames(){
    let playlistNames = getCookie('newPlaylistName').split(',');
    // console.log('playlist names', playlistNames)
    return playlistNames;
    // let userPlaylistEl = document.getElementById('userPlaylist');
    // userPlaylistEl.innerHTML = ``;
    // playlistNames.forEach(name => {
    //     userPlaylistEl.innerHTML += `<li><a onclick="addToPlaylist(${obj.id}, this.innerHTML)" class="dropdown-item" href="#">${name}</a></li>`
    // })


}

function myplaylistsTemplate(){
    let html = ``;
    let playlists = userPlaylistNames();
    let count = 0;

    playlists.forEach(p => {
        let lists = JSON.parse((getCookie(p)))
        let name = p;


        let d = {
            id : count++,
            user: getCookie('musicUsername'),
            playlist: name
        }

          
        let songs = ``;
        let songsCount = 1;

        lists.forEach(l => {
            console.log(d)
            songs += `<div class="public-playlist-dropdown-item" >${songsCount++}. ${l.title}</div>`
        })

        html += `
            <div class="public-btn-group">
                <button class="public-songs-btn" onclick="showListSongs(${d.id})">
                    <div class="row m-0 p-0">
                    <div class="col-1">${moreIcon}</div>
                    <div class="col-10"><b>${d.playlist}</b> playlist by <b>${d.user}</b></div>
                </button>
                
                <button id="public${d.id}" type="button" onclick="myPlaylist('${name}', false)" 
                    class="public-playlist-btn" data-bs-dismiss="modal">
                    <span class="menu-list"  id="list${d.id}">
                        ${playlistPlayIcon}
                    </span>
                </button>
                <div class="d-flex">
                    <button onclick="loadDeletePlaylistModal('${name}')"  data-bs-target="#mainModal" 
                        type="button" class="border-0 bg-transparent">
                        ${deleteIcon} 
                        
                    </button>
                    <button onclick="sharePlaylist('${name}')"  data-bs-target="#mainModal" type="button" 
                            class="border-0 bg-transparent">
                        ${shareIcon} 
                       
                    </button>

                    <button onclick="loadEditPlaylistModal('${name}')" 
                        data-bs-target="#mainModal" type="button" class="border-0 bg-transparent">
                        ${editIcon} <span class="ms-2"></span>
                    </button>
                </div>
            </div>
            

            <div id="songs${d.id}" class="public-playlist-dropdown d-none" >${songs}
                <button id="public${d.id}" type="button" onclick="myPlaylist('${name}', false)" 
                    class="btn-light border-0 rounded-3 mt-3" data-bs-dismiss="modal">
                    <span class=""  id="list${d.id}">
                        <b> Load Playlist</b> ${playlistPlayIcon}
                    </span>
                </button>
            </div>

            <br>
            <div style="height:15px;"></div>
            <hr>
            `


    })
    return html;
}

// myplaylist modal functions 
function loadMyplaylistModal(){
    let title = `My Playlists`;
    let body = myplaylistsTemplate();
    let footer = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`;
    let size = 'small';
    let type = 'purple'
    setModal(title, body, footer, type, size)

}



// track list item component return  
function trackListItemComponent(obj){

    let playlistNames = getCookie('newPlaylistName').split(',');

                        // <button onclick="loadAddPlaylistModal()" data-bs-toggle="modal" data-bs-target="#mainModal" type="button" 
                        //         class="create-playlist-btn" >
                        //     + New Playlist
                        // </button>
    let html =    `         
            <div id="playlistItem${obj.id}" 
                 class="playlist-item-container rounded-2 border border-secondary shadow-sm mb-1 p-1">

                <div class="dropdown">
                    <button class="add-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${playlistAddIcon}
                    </button>
                    <ul  class="dropdown-menu">

            
                        <div id="userPlaylist">`
                        
    playlistNames.forEach(name => {
        html += `
        <li><a onclick="addToPlaylist(${obj.id}, this.innerHTML)" class="dropdown-item" href="#">${name}</a></li>`
    })   
                        
           html +=             `

                        </div>
                    </ul>
                </div>

                <li class="playlist-items w-100" style="cursor:pointer;" onclick="playlist75remove()" 
                    data-src ="${obj.src}" 
                    data-title ="${obj.title}" 
                    data-artist ="${obj.artist}"
                    data-id="${obj.id}">
                  
                    <b class="text-uppercase">${obj.title}</b>
                    <br>
                    <span class="small ms-2">${obj.artist}</span>
                    
                </li>
            </div>`

            return html;
}

// search title/author
function playlistCustom(query, type) {
    
    playlist.innerHTML = ``;
    currentSongIndex = 0;
    

    let playlistHtml = '';
    let querySongs = [];
    songs = [];
    querySongs = [];
    totalSongs.innerHTML = `${songs.length} ${(songs.length == 1) ? 'SONG' : 'SONGS'}`;

    masterPlaylist.forEach(song => {
        
        // if (type === 'artist' && song.artist.toLowerCase().includes(query.toLowerCase())){
        //     querySongs.push(song)
        // }
        // if (type === 'title' && song.title.toLowerCase().includes(query.toLowerCase())){
        //     querySongs.push(song)
        // }

         if (song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())){
            querySongs.push(song)
        }

    })
    // songs = querySongs;

     querySongs.forEach(t => {
                    
            let obj = { title: t.title, src: t.src, artist : t.artist, id: t.id}
        
            songs.push(obj)
            playlistHtml += trackListItemComponent(obj)

            // get artists  for filtering
            if (artists.includes(t.artist) === false){
                artists.push(t.artist)
            }
        
    })
        playlist.innerHTML = playlistHtml
    // playPrevious();
    // playNext()
    loadSong(currentSongIndex);
    totalSongs.innerHTML = `${songs.length} ${(songs.length == 1) ? 'SONG' : 'SONGS'}`;
  
}

// display master playlist
function masterPLaylistRotate (shuffle=false) {
    // mySongs = [];
    currentSongIndex = 0;
    songs = [];
    let playlistHtml = '';

    // console.log(masterPlaylist)
     masterPlaylist.forEach(t => {
            // console.log(t)
          
            let obj = { title: t.title, src: t.src, artist : t.artist, id: t.id}
            songs.push(obj)
            // playlistHtml += trackListItemComponent(obj)

 
            // get artists  for filtering
            if (artists.includes(t.artist) === false){
                artists.push(t.artist)
            }
        })

        if (shuffle) { songs = shuffleArray(songs) }
        
        songs.forEach(s => { playlistHtml += trackListItemComponent(s)})
        playlist.innerHTML = playlistHtml
        totalSongs.innerHTML = songs.length > 1 ? songs.length + ' SONGS' : songs.length + " SONG";

}

// delete and edit playlist function
let deleteTrackArr = [];
function loadDeletePlaylistModal(playlistName){
        
    let title = `Delete Playlist`;
    let body = `Sure to delete playlist <b>${playlistName}</b>? `
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onclick="deletePlaylist('${playlistName}')" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>`;
    let size = 'small';
    let type = 'purple'
    setModal(title, body, footer, type, size)
}
function deleteTrackFromPlaylist(id, playlist){
    // console.log(id, ' id')
    // console.log(playlist, ' playlist')
    let removedTrack = [];
    if (deleteTrackArr.length > 0) {
        // console.log(deleteTrackArr)
        for (let x = 0; x < deleteTrackArr.length; x ++ ) {
            if (deleteTrackArr[x].id == id) {
                removedTrack = deleteTrackArr.splice(x, 1)
                document.getElementById(`track${id}`).classList.add('bg-danger-subtle')
                // if (deleteTrackArr.length > 0){
                //     setCookie(playlist, JSON.stringify(deleteTrackArr), 365)
                //     deleteTrackArr = [];
                //     myPlaylist(playlist);
                // } else {
                //     deletePlaylist(playlist)
                // }
                // console.log(deleteTrackArr)
                return;
            }
        }
    }
    
}
function savePlaylist(name){
    // console.log('delete track arr', deleteTrackArr)
    let arr = JSON.stringify(deleteTrackArr) || []
    // console.log(arr)
    setCookie(name, arr, 365);
    deleteTrackArr = [];
    myPlaylist(name)
}
function showDeleteButton(id){
    document.getElementById(`trackDelete${id}`).classList.remove('d-none')
}
function loadEditPlaylistModal (playlist){
    let i = 1;
    let title = `Edit Playlist`;
    let playlistObj = (JSON.parse(getCookie(playlist)));
    deleteTrackArr = playlistObj;
    let html = `<h5 >Select track to delete from <b>${playlist}</b>`;
    playlistObj.forEach(track => {

        // html += `<li class="delete-track-item" id="track${track.id}">
        //             ${i++}
        //             <button class="delete-track-btn" onclick="showDeleteButton(${track.id})">
        //                 <span><b>${track.title} <br> <small class="ms-1 text-secondary">${track.artist}</small> </b></span>
        //             </button>
        //             <button id="trackDelete${track.id}" class="delete-track-icon d-none" 
        //                 onclick="deleteTrackFromPlaylist(${track.id}, '${playlist}')">${whiteDeleteIcon}</button>
        //         </li>`
        html += `<li class="delete-track-item" id="track${track.id}">
                    ${i++}
                    <button class="delete-track-btn" onclick="deleteTrackFromPlaylist(${track.id}, '${playlist}')">
                        <span><b>${track.title} <br> <small class="ms-1 text-secondary">${track.artist}</small> </b></span>
                    </button>
                    <button id="trackDelete${track.id}" class="delete-track-icon" 
                        onclick="deleteTrackFromPlaylist(${track.id}, '${playlist}')">${whiteDeleteIcon}</button>
                </li>`
                // console.log(track)
    })

    let body = html
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-danger" onclick="savePlaylist('${playlist}')" data-bs-dismiss="modal">Delete</button>
                  `;
    let size = 'small';
    let type = 'purple'
    setModal(title, body, footer, type, size)
}
function deletePlaylist(playlistName){
    console.log('Playlist to be deleted ', playlistName)
    let arr = [];
    console.log(userPlaylistNames())
    userPlaylistNames().forEach(n => {
        if (n.toLowerCase() != playlistName.toLowerCase()) {
            arr.push(n)
        }
    })
    setCookie('newPlaylistName', arr, 365)
    setCookie(playlistName, '', 0)
    setPlaylists()
    masterPLaylistRotate()
    
}

// share my playlists 
function shareNameChange(name, playlist){
    let shareTagEl = document.getElementById('shareTag');
    shareTagEl.innerHTML = `<b>${playlist}</b> playlist shared by <b>${name}</b>`
    setCookie('musicUsername', name, 365)
    
    let username = (getCookie('musicUsername'))
    document.getElementById('user').innerHTML = username[0].toUpperCase() + username.slice(1, username.length) 
}
let sharedPlaylist = {}
function fetchSharePlaylist(){
    // console.log(JSON.stringify(sharedPlaylist))
            
        
     fetch(`${pre}/music/share-playlist`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sharedPlaylist)
        
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // return response.json(); 
        // Parse the JSON response
        })
        .then(data => {
            console.log('Success:', data);
            notify(data.message, 'success', 1500)
            fetchPublicPlaylists()

        })
        .catch(error => {
            console.error('Error:', error);
        }); 
}
function sharePlaylist(playlistName){
            
    let title = `Share Playlist`;
    let body = `Share playlist <b>${playlistName}</b> to the world ? 
                <input type="text" id="musicUsername" placeholder="Enter screen name" class="form-control" 
                value="${getCookie('musicUsername') ? getCookie('musicUsername') : ''}" onkeyup="shareNameChange(this.value, '${playlistName}')">
                <hr>
                <div id="shareTag" style="min-height:56px;" class="bg-primary-subtle p-3 rounded-1 d-none"></div> 
                <hr>
                `
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onclick="fetchSharePlaylist()" class="btn btn-primary" data-bs-dismiss="modal">Share</button>`;
    let size = 'md';
    let type = 'purple'

    setModal(title, body, footer, type, size)

    let data = {
        'playlist' : playlistName,
        'tracks' : JSON.parse(getCookie(playlistName)),
        'user' : (getCookie('musicUsername')) ? getCookie('musicUsername') : ''
    }
    // console.log('shared ', data)
    sharedPlaylist = data
    // console.log(sharePlaylist)
   
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}


// render playlists
function myPlaylist (playlistName, shuffle = false) {




    let isNum = false;
    (typeof playlistName == 'number') ? isNum = true : ''
    // playlist.innerHTML = ``;
    currentSongIndex = 0;
    songs = [];
    let playlistHtml = '';
    let playlistSongs = (getCookie(playlistName) != '') ? JSON.parse(getCookie(playlistName)) : '';

    if (isNum){
       
        publicList.forEach(item => {
            if (playlistName == item.id) {

                playlistSongs = item.track
                playlistName = item.playlist

                if (shuffle == true) {
                    shuffleArray(playlistSongs)
                } 
            }

        })
      
    } 

    // if (getCookie(playlistName) == '') { 
    //     notify(`No songs for playlist ${playlistName}`, 'purple', 2000); 
    //     return;
    // }
    // console.log('loading playlist ', playlistName)
    // console.log('my songs @ playlist', playlistSongs)
// console.log(publicList[0].user)
    playlistHtml += 

    `
    <h5 class="playlist-title">${playlistName} </h5>
    <div class="playlist-btn-group ${(isNum) ? 'd-none' : ''}">
    
        <button onclick="loadDeletePlaylistModal('${playlistName}')" data-bs-toggle="modal" data-bs-target="#mainModal" type="button" class="mt-2 delete-playlist-btn">
            <img src="assets/icons/delete.png" alt="Clear Playlist" width="25" height="25" class="me-2"> 
            Delete 
        </button>
        
        <button onclick="sharePlaylist('${playlistName}')" data-bs-toggle="modal" data-bs-target="#mainModal" type="button" 
                class="mt-2 delete-playlist-btn ">
            ${shareIcon} 
            <span class="ms-2"> Share</span> 
        </button>

        <button onclick="loadEditPlaylistModal('${playlistName}')" 
                data-bs-toggle="modal" data-bs-target="#mainModal" type="button" class="mt-2 edit-playlist-btn">
        ${editIcon} <span class="ms-2">Edit</span> 
    </button>
    </div>

    <hr>`

    playlistSongs.forEach(t => {
        let obj = { title: t.title, src: t.src, artist : t.artist, id: t.id}
        songs.push(obj)
        playlistHtml += trackListItemComponent(obj)
    })
    // songs = playlistSongs;

    playlistHtml += `<div style="padding-bottom: 100px;"></div>`
    playlist.innerHTML = playlistHtml;
    totalSongs.innerHTML = songs.length > 1 ? songs.length + ' SONGS' : songs.length + " SONG";
    loadSong(currentSongIndex);


}



// public playlists functions
let publicList = [];
function loadPublicPlaylist(id){
    console.log('loading id ', id)
    publicList.forEach(p => {
        if (p.id == id) {

        }
})
}
function showListSongs(id){

    document.querySelectorAll('.public-playlist-dropdown').forEach(d => {
        d.classList.add('d-none')
    })


    if ( document.getElementById(`songs${id}`).classList.contains('d-none')){
        
        document.getElementById(`songs${id}`).classList.remove('d-none')
        document.getElementById(`songs${id}`).scrollIntoView({ 
            behavior: 'smooth',   
            block: 'center',       
            inline: 'nearest'     
        });
    } else {
        document.getElementById(`songs${id}`).classList.add('d-none')
    }
}
function saveToMyplaylist(id){
    let list = publicList.find(i => i.id == id)
    console.log(list.user)
    let plNames = (getCookie('newPlaylistName').split(','))

    plNames.push(list.playlist);

    let nameToSave = (plNames.join(','))
    let playListToSave = (JSON.stringify(list.track))

    // console.log('name', nameToSave)
    // console.log('playlist', playListToSave)
    setCookie('newPlaylistName', '', 0)
    // plNames.forEach(item => {
    //     setCookie(`${item}`, '', 0)
    // })
    setCookie('newPlaylistName', nameToSave, 365)
    setCookie(`${list.playlist}`, playListToSave, 365)

    let html = ``;
    userPlaylistNames().forEach(name => {
            html += `<button onclick="myPlaylist('${name}')" class="playlist-btn">${name}</button>`
    })
        
    document.getElementById('userPlayList').innerHTML = html;

    const myModalEl = document.getElementById('mainModal');
    const myModal = bootstrap.Modal.getInstance(myModalEl);
    myModal.hide();
    
}

function fetchPublicPlaylists(){
    // console.log(publicPlaylistUrl)
    // console.log('loading public')
    // const publicMenu = document.getElementById('publicPlaylistMenu') ;
    let html = `<div style="padding-top:30px;">
   
    </div>`;
    let songsCount = 1;
    function loadPublicMenu(d){
        let shouldShow = false;
        let songs = ``;
        d.track.length > saveLength ? shouldShow = false : shouldShow = true
        d.track.forEach(t => {
            songs += `<div class="public-playlist-dropdown-item mb-0" >${songsCount++}. ${t.title}</div>`
        })

        html += `
         
            <div class="d-flex justify-content-between shadow py-3 px-2 rounded-1 bg-secondary-subtle">
            
                    <button class="w-100 text-dark border-0 rounded-1 p-2 text-start position-relative" onclick="showListSongs(${d.id})">
                        <span class="badge text-bg-secondary bg-purple position-absolute top-0 start-0 translate-middle badge rounded-pill">
                            <b><small>${d.track.length}</b></small>
                        </span>
                        <b >${d.playlist}</b> playlist by <b>${d.user}</b>
                    </button>


                    <div class="d-flex justify-content-end">
                        <button class="border-0 bg-transparent" onclick="showListSongs(${d.id})">${moreIcon}</button>
        
                `
        shouldShow  ? html += `<button class="border-0 bg-transparent" onclick="saveToMyplaylist(${d.id})">${saveIcon}</button> `
                    : html += `<button class="disabled border-0 bg-transparent" onclick="alert('Mytunes - Unable to save playlist. Too many songs on list!')">${saveIcon}</button> `
                
        html += `

                <button id="public${d.id}" type="button" onclick="myPlaylist(${d.id}, true)" 
                    class="border-0 bg-transparent" data-bs-dismiss="modal">
                    <span class="menu-list"  id="list${d.id}">
                        ${playlistPlayIcon}
                    </span>
                </button>
              </div>
            </div>
            
            
            
            <div id="songs${d.id}" class="public-playlist-dropdown d-none" >${songs}
                <button id="public${d.id}" type="button" onclick="myPlaylist(${d.id}, true)" 
                    class="btn-light border-0 rounded-3 mt-3" data-bs-dismiss="modal">
                    <span class=""  id="list${d.id}">
                        <b> Load Playlist</b> ${playlistPlayIcon}
                    </span>
                </button>

                
            </div>

          
        
            <hr>
            `
        songsCount = 1;
        return html

    }

    fetch(publicPlaylistUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        // console.log(data); 
        publicList = data
        data.forEach(rec => {
            loadPublicMenu(rec)
        })


        // publicMenu.innerHTML = html;
        let title = `Public playlists`;
        let body = html;
        let footer = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`;
        let size = 'small';
        let type = 'purple'
        setModal(title, body, footer, type, size)
   
       
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Handle network errors or other issues
    });
    // publicPlaylist.innerHTML = `loading list`
}

// artists.forEach(a => {
//     let arr = [];
//     artists.forEach(a => {
//         fetchMetaArtist(a)
//     })
// })
function fetchMetaArtist(artist){
    if (artist == 'ACDC') { artist = 'AC/DC' }
    if (artist == 'The Notorious BIG') { artist = 'The Notorious B.I.G.' }
    if (artist == 'Afrika Bambaataa & the Soulsonic Force') { artist = 'Afrika Bambaataa' }
    if (artist == 'Alan Jackson and Jimmy Buffett') { artist = 'Alan Jackson' }
    let url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`


    // console.log(artist)
     fetch(url)
      .then(response => response.json()) // Process the response body as JSON
      .then(data => {

        // if (data.length > 0){
        console.log(data)
            let artist = data
            if (artist.artists !== null) {
                let banner = artist.artists[0].strArtistBanner;
                let cutout = artist.artists[0].strArtistCutout
                let fanart = artist.artists[0].strArtistFanart
                let logo = artist.artists[0].strArtistLogo;
                let genre = artist.artists[0].strGenre;
                let fb = artist.artists[0].strFacebook;
                let clearart = artist.artists[0].strArtistClearart;
                let wideThumb = artist.artists[0].strArtistWideThumb;
                let strFacebook = artist.artists[0].strFacebook;
                let thumb = artist.artists[0].strArtistThumb



                if (typeof(artist) == 'object') {
                    document.getElementById("img-logo").src = logo
                    document.getElementById('playerApp').style.backgroundImage = `url("${thumb}")`
            
                } 

           
            } else {
                    document.getElementById("img-logo").src = '/favico.ico'
                    document.getElementById('playerApp').style.backgroundImage = `url('../../assets/bg/bg3.jpg')`
            }



        // }

      })
      .catch(error => console.error('Error:', error));
}

function fetchLogoArtist(artist){
    let url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
    let image = ''

     fetch(url)
      .then(response => response.json()) // Process the response body as JSON
      .then(data => {

        // if (data.length > 0){
       
            let artist = data
            if (artist.artists !== null) {

                let logo = artist.artists[0].strArtistLogo;
                image = logo

            } else {
                image = true;
            }


        return image
      })
      .catch(error => console.error('Error:', error));
}

// music player functions
function loadSong(index) {
    // console.log('Playing ...' , songs[index])
    audioPlayer.src = songs[index].src;
    audioPlayer.load(); 

    // Update active class on playlist items
    Array.from(playlist.children).forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');

            nowPlaying.textContent = `${songs[index].title} - ${songs[index].artist}`
            nowPlaying.classList.add('now-playing');
            setTime()
            fetchMetaArtist(`${songs[index].artist}`)
            
        } else {
            item.classList.remove('active');
        }
    });
    audioPlayer.play()
    document.getElementById('play-pause-btn').innerHTML = pauseIcon;

}
function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = playIcon;
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = pauseIcon;
        
    }
}
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
}
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
}

// Event Listeners
playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);
audioPlayer.addEventListener('ended', playNext);
playlist.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const selectedSrc = event.target.dataset.src;
        const index = songs.findIndex(song => song.src === selectedSrc);
        if (index !== -1) {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audioPlayer.play();
            playPauseBtn.innerHTML = pauseIcon;
        }
    }
});


// time duration functions
let slider = document.getElementById('timeSlider');
function changeTime(t){
    audioPlayer.currentTime = t
}
function setTime(){
    let duration = audioPlayer.duration;
    let current = audioPlayer.currentTime;
    slider.max = duration;
    slider.value = current;
    // console.log('current', current, ' ', duration, ' duration');
}
setInterval(() => { setTime() }, 1000)


// utility functions for modal 
function getClassList(type){
    let bgClass = 'bg-primary'
    let link = '';
    if (type === 'success') 
        { bgClass = 'bg-success'; link = `assets/icons/success.jpg`}
    if (type === 'error' || type === 'danger') 
        { bgClass = 'bg-danger'; link = `assets/icons/error.jpg`}
    if (type === 'warning') 
        { bgClass = 'bg-warning'; link = `assets/icons/warning.png` }
    if (type === 'info') 
        { bgClass = 'bg-info'; link = `assets/icons/info.png` }
    if (type === 'primary') 
        { bgClass = 'bg-primary'; link = `assets/icons/primary.png` }
    if (type === 'secondary') 
        { bgClass = 'bg-secondary'; link = `assets/icons/light.png` }
    if (type === 'dark') 
        { bgClass = 'bg-dark'; link = `assets/icons/dark.png` }
    if (type === 'light') 
        { bgClass =  'bg-light'; link = `assets/icons/light.png` }
    if (type === 'bright') 
        { bgClass = 'bg-bright'; link = `assets/icons/bright.png` }
    if (type === 'purple') 
        { bgClass = 'bg-purple'; link = `assets/icons/light.png` }
    
    let obj = {
        'type' : type,
        'bg' : bgClass,
        'img' : link,
    }
    return obj
}
function setModal(title, body, footer, type='primary', size='sm'){

    // let title = `Error`;
    // let body = `<img src='assets/icons/error.jpg' width="25" class="me-3"/>No active invoice to delete!`;
    // let footer = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`;
    // let size = 'small';
    // let type = 'error'
    // setModal(title, body, footer, type, size)
    // console.log(title, body, footer, type, size)

    let allBgClass = ['bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-purple', 'bg-primary', 'bg-secondary', 'bg-dark', 'bg-light', 'bg-bright' ]
    let allSize = ['modal-sm', 'modal-lg', 'modal-xl', 'modal-fullscreen', 'modal-fullscreen-sm-down', 'modal-fullscreen-md-down', 'modal-fullscreen-lg-down']
    
    // let img = `<img src="${getClassList(type).img}" width="25" class="rounded me-2">`
    document.getElementById('mainModalBody').innerHTML = body;
    document.getElementById('mainModalLabel').innerHTML = title;
    document.getElementById('mainModalFooter').innerHTML = footer;

    let modalElemHeader = document.getElementById('modalHeader');
    
    allBgClass.forEach(bg => {
        modalElemHeader.classList.remove(bg)
    })
    modalElemHeader.classList.add(getClassList(type).bg)

    let modalDialogElem = document.getElementById('modalDialog')
    allSize.forEach(s => {
        modalDialogElem.classList.remove(s)
    })

    modalDialogElem.classList.add('modal-' + size)
    
}




// load user playlists from cookies
function setPlaylists(){
    let userPlayListEl = document.getElementById('userPlayList');
    let html = ``;
    lists = userPlaylistNames();

    if (getCookie('newPlaylistName') == ''){
        // console.log('no playlist')
        userPlayListEl.innerHTML = '';
    } else {
        lists.forEach(name => {
            html += `<button onclick="myPlaylist('${name}')" class="playlist-btn">${name}</button>`
        })
        userPlayListEl.innerHTML = html;
    }

}


// aetist feature
function loadArtistModal() {
let html = ``;

artists.forEach(a => {
   
    // console.log(imgArtist)
    html += `
    <li class="artist list-group-item d-flex justify-content-between align-items-center p-2 border mb-2 shadow-sm rounded-2">
        <button class="border-0 bg-transparent text-start w-100 cursor-pointer"
                onclick="playlistCustom('${a}', 'artist')" data-bs-dismiss="modal">
            <b class="text-dark fw-bold">${a}</b>
            
        </button>
        
    </li>
    `
})

    let title = `<span class="p-2 badge text-bg-light rounded-pill">${artists.length}</span>
                 <span class="fs-4">Artists</span>`;
    let body = html;
    let footer = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`;
    let size = 'md';
    let type = 'purple'
    setModal(title, body, footer, type, size)
    
}



// Initial load features 
document.addEventListener('DOMContentLoaded', () => {

    // Initial load
    loadSong(currentSongIndex);

    document.getElementById('expandUpBtn').innerHTML = expandIcon;
    document.getElementById('prev-btn').innerHTML = prevIcon;
    document.getElementById('next-btn').innerHTML = nextIcon;
    document.getElementById('play-pause-btn').innerHTML = playIcon;
    document.getElementById('playerExpand').innerHTML =  expandDownLineIcon;
    document.querySelector('#new-btn').innerHTML = addPlaylist + '<span class="ms-2">New</span>';
    document.querySelector('#songs-btn').innerHTML = allSongsIcon + '<span class="ms-2">All</span>';




    let userPlayListEl = document.getElementById('userPlayList');
    let html = ``;
    lists = userPlaylistNames();
    // console.log('user playlist names: ', lists)


    
    if (getCookie('musicUsername')){
        let username = (getCookie('musicUsername'))
        let greet = username[0].toUpperCase() + username.slice(1, username.length) 
        console.log('Welcome ', greet)
        document.getElementById('user').innerHTML = `<b>${greet}</b>`
    }

    
    if (getCookie('newPlaylistName') == ''){
        userPlayListEl.innerHTML = '';
    } else {
        lists.forEach(name => {
            html += `<button onclick="myPlaylist('${name}')" class="playlist-btn menu-btn">${name}</button>`
        })
        userPlayListEl.innerHTML = html;
    }


    fetchPublicPlaylists()

})


function togglePlaylist(){
    let player = document.getElementById('playerApp')
    let playlist = document.getElementById('playlist')

    // player is small
    if (player.style.height !== '100vh'){
        player.style.height = '100vh';
        player.classList.add('d-none')
        playlist.style.height = '100vh'
         playlist.style.maxHeight = '100vh'
         playlist.classList.add('slide-up')
        document.getElementById('expandUpBtn').innerHTML = expandDownIcon;
        document.getElementById('playerExpand').innerHTML = expandDownLineIcon;


    } else {
        player.style.height = '55vh';
        player.classList.remove('d-none')
        playlist.style.height = '100vh'
        playlist.style.maxHeight = '100vh'
        playlist.classList.remove('slide-up')
        document.getElementById('expandUpBtn').innerHTML = expandIcon;


    }

}

function togglePlayer(){
    let player = document.getElementById('playerApp')
    let playlist = document.getElementById('playlist')

    if (player.style.height !== '94vh'){
        player.style.height = '94vh';
        player.classList.remove('d-none')
        playlist.style.height = '0vh'
         playlist.style.maxHeight = '0vh'
         playlist.classList.add('slide-up')
        document.getElementById('playerExpand').innerHTML = expandUpCaret;
        document.getElementById('expandUpBtn').innerHTML = expandIcon;


    } else {
        player.style.height = '55vh';
        player.classList.remove('d-none')
        playlist.style.height = '100vh'
        playlist.style.maxHeight = '100vh'
        playlist.classList.remove('slide-up')
        document.getElementById('playerExpand').innerHTML = expandDownLineIcon;


    }

}


function playlist75add() {
    let p = document.getElementById('playlist');
    p.classList.add('playlist75');


}
function playlist75remove() {
    let p = document.getElementById('playlist');
    p.classList.remove('playlist75');
    // document.getElementById('search-bar').value = ''
}

