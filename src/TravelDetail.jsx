import { useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "./header";
import FogEffect from "./FogEffect";
import { usePageTransition } from "./usePageTransition";
import AmbientEffect from "./AmbientEffect";
import "./TravelDetail.css";
import "./PlaceGallery.css";

/* Same travels array — shared source of truth */
const travels = [
  {
    id: 1,
    place: "Kashmir",
    country: "India",
    tag: "Valleys · Snow Peaks",
    description: "Dal Lake at dawn, saffron fields in autumn and mountains so vast they make every worry feel small.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=90",
    color: "#4facfe",
  },
  {
    id: 2,
    place: "Meghalaya",
    country: "India",
    tag: "Clouds · Living Roots",
    description: "The abode of clouds — rolling green hills, living root bridges and waterfalls that seem to fall from the sky itself.",
    img: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1400&q=90",
    color: "#11998e",
  },
  {
    id: 3,
    place: "Assam",
    country: "India",
    tag: "Tea · Wildlife",
    description: "Endless tea gardens, the mighty Brahmaputra and one-horned rhinos wandering through Kaziranga's grasslands.",
    img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1400&q=90",
    color: "#f7971e",
  },
  {
    id: 4,
    place: "Kerala",
    country: "India",
    tag: "Backwaters · Spices",
    description: "Houseboat mornings on glassy backwaters, spice-scented air and sunsets that melt into the Arabian Sea.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=90",
    color: "#43e97b",
  },
  {
    id: 5,
    place: "Goa",
    country: "India",
    tag: "Beach · Vibes",
    description: "Golden sands, vibrant beach shacks and sunsets that paint the Arabian Sea in a hundred shades of orange.",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1400&q=90",
    color: "#ff6b35",
  },
  {
    id: 6,
    place: "Pondicherry",
    country: "India",
    tag: "French Quarter · Cafés",
    description: "Pastel-coloured colonial streets, bougainvillea walls and a tranquil seafront that blends Tamil soul with French charm.",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1400&q=90",
    color: "#f093fb",
  },
  {
    id: 7,
    place: "Delhi",
    country: "India",
    tag: "Heritage · Street Food",
    description: "Mughal monuments, chaotic bazaars, the best street food in the country and centuries of layered history at every corner.",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=90",
    color: "#ff004f",
  },
  {
    id: 8,
    place: "Tamil Nadu",
    country: "India",
    tag: "Temples · Culture",
    description: "Towering gopurams, Carnatic music drifting through corridors and a classical culture rooted deeply in every stone.",
    img: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=1400&q=90",
    color: "#c850c0",
  },
  {
    id: 9,
    place: "Chandigarh",
    country: "India",
    tag: "Architecture · Gardens",
    description: "Le Corbusier's planned city — wide boulevards, the surreal Rock Garden and a clean green energy unlike any Indian city.",
    img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1400&q=90",
    color: "#4facfe",
  },
  {
    id: 10,
    place: "Karnataka",
    country: "India",
    tag: "Ruins · Coffee Hills",
    description: "Hampi's boulder-strewn ruins, Coorg's misty coffee hills, Mysore's palaces and a coast that stays untouched.",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=90",
    color: "#f7971e",
  },
  {
    id: 11,
    place: "Andhra Pradesh",
    country: "India",
    tag: "Temples · Coastline",
    description: "The sacred corridor of Tirupati, untouched Araku Valley, fiery cuisine and a long scenic coastline.",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1400&q=90",
    color: "#ff6b35",
  },
  {
    id: 12,
    place: "Telangana",
    country: "India",
    tag: "Hyderabad · Forts",
    description: "Biryanis that define a city, the grand Charminar at dusk and Ramoji Film City — Telangana is boldly its own story.",
    img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1400&q=90",
    color: "#c850c0",
  },
];

/* ── Per-place gallery data ──────────────────────────────────────── */
const galleryData = {
  1: { items: [
    { type: "image", caption: "Dal Lake",          span: "tall",  img: "https://lh3.googleusercontent.com/d/1tnbHPH90S373HlQvSGaXeE-7J8wmxqAN" },
    { type: "image", caption: "Gulmarg Meadows",   span: "wide",  img: "https://lh3.googleusercontent.com/d/1-T_2Gg_dnF5dVPiAU49VQ8DL-76jwPWU" },
    { type: "image", caption: "Sonamarg Trail",    span: "tall",  img: "https://lh3.googleusercontent.com/d/1GjcOenWIVejZigAP_vCaq8cawIZlvhoV" },
     { type: "image", caption: "Pari Mahal",        span: "wide",  img: "https://lh3.googleusercontent.com/d/1Y5rb7FWgJ5Xd3G9b92o2b_joWsvl1oHQ" },
    { type: "quote", text: "If there is paradise on earth, it is this, it is this, it is this.", author: "Emperor Jahangir" },
    { type: "image", caption: "Snow Peaks",        span: "wide",  img: "https://lh3.googleusercontent.com/d/1wF3J-e2Chef9JJ6wiM03ogq5gBGeYQYh" },
    { type: "image", caption: "Saffron Fields",    img: "https://lh3.googleusercontent.com/d/1ALQdz_NHUp--L_Nwi6KUBxh79GCj8K3K" },
    { type: "image", caption: "Nagin Lake",        span: "tall",  img: "https://lh3.googleusercontent.com/d/1FEmylMMuSnirXU3lpQTX31gstlTPKbvd" },
    { type: "image", caption: "Pahalgam Valley",   span: "tall",  img: "https://lh3.googleusercontent.com/d/1B3egZrvbcxj5dJH8Jb9k79Zd731p921O" },
    { type: "quote", text: "Kashmir is not just a place — it is a feeling you carry forever.", author: "" },
    { type: "image", caption: "Shikaras at Dusk",  span: "wide",  img: "https://lh3.googleusercontent.com/d/1X79svcxI1CcmbVq-8_CT17JOhPt2OcDU" },
    { type: "image", caption: "Betaab Valley",     span: "tall",  img: "https://lh3.googleusercontent.com/d/1ciW2skxKgJbsRQ5N7gdThOs_hLmPti-L" },
    { type: "image", caption: "Yusmarg Meadows",   span: "wide",  img: "https://lh3.googleusercontent.com/d/1_g2JjRhmc4GSX6clcggeWie74agdwdFa" },
    { type: "image", caption: "Wular Lake",        span: "tall",  img: "https://lh3.googleusercontent.com/d/1DQBqsC6XAQkVDA7I-dUxoLz0OAhpKY6B" },
   
    { type: "image", caption: "Doodhpathri",       span: "wide",  img: "https://lh3.googleusercontent.com/d/1xLpxmmPX2VqH6wMuPbae3bnjquRajt24" },
    { type: "image", caption: "Shankaracharya",    span: "tall",  img: "https://lh3.googleusercontent.com/d/1iE7afCyk6RBQMQS10FOdRU2hMULYYL1-" },
    { type: "image", caption: "Tulip Garden",      span: "tall",  img: "https://lh3.googleusercontent.com/d/1rIYRrKPDQ9mGkAyKE87k0Sns-oOKHcO2" },
    { type: "image", caption: "Nigeen Lake",       span: "wide",  img: "https://lh3.googleusercontent.com/d/1brcLnUPBiteD7kxFOajVkV5DusByac-Q" },
  ]},
  2: { items: [
    { type: "image", caption: "Living Root Bridge", img: "https://lh3.googleusercontent.com/d/1mNO5uT-yqHkPjXjOw83knoqH-27oDSEr" },
    { type: "image", caption: "Cherrapunji Clouds",  span: "wide",  img: "https://lh3.googleusercontent.com/d/1-kePQ4hCpRM6BGJf3Afq0LO-OpP4PsBG" },
    { type: "image", caption: "Double Decker Bridge", img: "https://lh3.googleusercontent.com/d/18t-4l8ZmOUBsKUGM5wGYh8nbOcoYvFya" },
    { type: "quote", text: "The mountains are calling and I must go.", author: "John Muir" },
    { type: "image", caption: "Nohkalikai Falls",    span: "wide",  img: "https://lh3.googleusercontent.com/d/1OIRd2rajUxD9GFpuW3ZsqQBZIA6Fq0Z0" },
    { type: "image", caption: "Dawki River",         span: "wide",  img: "https://lh3.googleusercontent.com/d/1fqLI47xIoGmwUkClBkWClNBvnv2gaoL1" },
    { type: "image", caption: "Mawlynnong Village",  span: "tall",  img: "https://lh3.googleusercontent.com/d/1mqcVaclSIIaAImAvZHPm6lu_WR6i2P6k" },
    { type: "image", caption: "Umiam Lake",          span: "wide",  img: "https://lh3.googleusercontent.com/d/1qwRvN3Fc2olJHFDCJE5m10mKD0Ymwm2P" },
    { type: "image", caption: "Laitlum Canyons",       img: "https://lh3.googleusercontent.com/d/1RwcLlt7Tbzl_05jcwy80JbLJzHytEuNu" },
    { type: "quote", text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
    { type: "image", caption: "Mawphlang Forest",      img: "https://lh3.googleusercontent.com/d/1a_IZ_gdbM7-RuxXoraPW3ecVOdXWAYt0" },
    { type: "image", caption: "Rolling Green Hills",   img: "https://lh3.googleusercontent.com/d/1MF5nxq7qZHFSqqz1iu_ERct4jiv4viZF" },
  ]},
  3: { items: [
    { type: "image", caption: "Kaziranga Grasslands", span: "tall",  img: "https://lh3.googleusercontent.com/d/Cml1spqPC8J9wCKY446fJwS4RFHuD9QS" },
    { type: "image", caption: "Tea Garden Trail",     span: "wide",  img: "https://lh3.googleusercontent.com/d/1KDrZYAMYMtwCmKpzO_nnAa068Zfehj-u" },
    { type: "image", caption: "Brahmaputra Sunrise",  span: "tall",  img: "https://lh3.googleusercontent.com/d/Cml1spqPC8J9wCKY446fJwS4RFHuD9QS" },
    { type: "image", caption: "One-Horned Rhino",     span: "wide",  img: "https://lh3.googleusercontent.com/d/1gpFb8FbJ_-hQtAGXrJfvBg4tRsfbqdQg" },
    { type: "image", caption: "Majuli Island",        span: "tall",  img: "https://lh3.googleusercontent.com/d/1x_1o_2jjpzSvI2XRoOLRc5dX5GOrk1sd" },
    { type: "image", caption: "Morning Mist",                        img: "https://lh3.googleusercontent.com/d/1IKM9lroip5T6mB_c0-EaKfcXHjA38K7W" },
    { type: "quote", text: "Tea is the magic key to the vault where my brain is kept.", author: "Frances Hardinge" },
    { type: "image", caption: "Dibrugarh Tea Estate", span: "wide",  img: "https://lh3.googleusercontent.com/d/1qrv9oiHs_bI1skR6LuYWmQphRpjfa3LZ" },
    // { type: "image", caption: "Manas National Park",  span: "tall",  img: "https://lh3.googleusercontent.com/d/1e_NlGo8cAJmXhc_rFi1HI2817mFNLXKr" },
    { type: "image", caption: "Kamakhya Temple",      span: "wide",  img: "https://lh3.googleusercontent.com/d/1B3pRg88zt8upQJXwkxgSKWjorpVFsnDU" },
    { type: "image", caption: "Sualkuchi Weaving",                   img: "https://lh3.googleusercontent.com/d/1hWz3qqChsnIj4rB1yx72jHU5GIlffHck" },
    { type: "image", caption: "Haflong Lake",         span: "tall",  img: "https://lh3.googleusercontent.com/d/1JAnQ8QN2gyUsnCASEhpk4dNs2QFXFjMQ" },
    { type: "quote", text: "Wildlife is something which man cannot construct. Once it is gone, it is gone forever.", author: "Joy Adamson" },
    { type: "image", caption: "Dhola-Sadiya Bridge",  span: "wide",  img: "https://lh3.googleusercontent.com/d/11VHI1AoLSWjBsdAlHQFMEvENxruOEaKn" },
    { type: "image", caption: "Golden Tea Fields",    span: "tall",  img: "https://lh3.googleusercontent.com/d/188M2MAQBwjMjdjFQ87K3CguZh4vfPASp" },
    { type: "image", caption: "Umananda Temple",                     img: "https://lh3.googleusercontent.com/d/1es1Gv8dulFA02vL67IJQcD1HTS3vhAoG" },
    { type: "image", caption: "Pobitora Reserve",     span: "wide",  img: "https://lh3.googleusercontent.com/d/1eQuWeYsp9pfnhEWgxkQbiAkbtfNF8I8G" },
    { type: "image", caption: "Rang Ghar",            span: "tall",  img: "https://lh3.googleusercontent.com/d/18KXSqtbRuf-ns7GUuMsWTkA6juIJJdPo" },
    { type: "image", caption: "Deepor Beel",          span: "wide",  img: "https://lh3.googleusercontent.com/d/1OVqFFPykN5Jyirqx1Omhh97xCNuqq6Xi" },
    { type: "image", caption: "Brahmaputra at Dusk",  span: "tall",  img: "https://lh3.googleusercontent.com/d/1-gHzqQiKfNcZIYr-KqzkUjnopDmYqil5" },
    { type: "image", caption: "Misty Valleys",        span: "wide",  img: "https://lh3.googleusercontent.com/d/1cnGyYuuWnGidn8WHTF-APainVrcaTJ0m" },
    { type: "image", caption: "Assam Sunrise",                       img: "https://lh3.googleusercontent.com/d/1s-MKRhS6fEQsF8LUPRxwukHEfVDZrtkt" },
  ]},
  4: { items: [
    { type: "image", caption: "Alleppey Backwaters", span: "tall",  img: "https://lh3.googleusercontent.com/d/1E3mvcOas1WKhoxS4ct4dPHkom9sE3lc3" },
    { type: "image", caption: "Munnar Tea Hills",    span: "wide",  img: "https://lh3.googleusercontent.com/d/1U0ScQT5BzZ5FBEX2BbRviiajbtIfrJFC" },
    { type: "image", caption: "Houseboat Morning",   span: "tall",  img: "https://lh3.googleusercontent.com/d/1nwoJbUNJIG4SCZ_DK1j2r8FsHndIj2Wm" },
    { type: "image", caption: "Paddy Fields",        span: "wide",  img: "https://lh3.googleusercontent.com/d/1SO24RCE3gM5mTTPV7W5m0zQsSoTlxoSB" },
    { type: "image", caption: "Kovalam Sunset",      span: "tall",  img: "https://lh3.googleusercontent.com/d/1qux2COdjkQeN3Rr_CfebxkiiY4m4UuRG" },
    { type: "image", caption: "Wayanad Forest",                     img: "https://lh3.googleusercontent.com/d/1pJRPESZWpw71pyHQrz_bpmU3e6CrsbYY" },
    { type: "quote", text: "Kerala is not a destination — it is a therapy for the soul.", author: "" },
    { type: "image", caption: "Varkala Cliffs",      span: "wide",  img: "https://lh3.googleusercontent.com/d/1OaVb-7h3vfqVOxq86Fjn5PwbbtnfGdcd" },
    { type: "image", caption: "Spice Plantations",   span: "tall",  img: "https://lh3.googleusercontent.com/d/1rHSBrmmkvwceOunhvMn_q2KBM_YEFaAq" },
    { type: "image", caption: "Kumarakom Birds",     span: "wide",  img: "https://lh3.googleusercontent.com/d/1ofWgHIdDfeBF2nk5Y2RazED_YdhIVmmE" },
    { type: "image", caption: "Thekkady Wildlife",                  img: "https://lh3.googleusercontent.com/d/1BDu9kaaKLO5iZ7u6sAmmfkkE8Bp-_swr" },
    { type: "image", caption: "Thrissur Pooram",     span: "tall",  img: "https://lh3.googleusercontent.com/d/1fC80_2YEi1Zi69ttNDvbDYeu0RoOXy46" },
    { type: "quote", text: "Slow travel is the art of being fully present wherever you are.", author: "" },
    { type: "image", caption: "Kochi Fort",          span: "wide",  img: "https://lh3.googleusercontent.com/d/1fGPcnMluI2ZRi0G3S9ID8Qv6TZP941KR" },
    { type: "image", caption: "Chinese Fishing Nets",span: "tall",  img: "https://lh3.googleusercontent.com/d/1H9XA0F337lv3WqpE42nnI1uzRFG3ypIW" },
    { type: "image", caption: "Kalpetta Hills",                     img: "https://lh3.googleusercontent.com/d/1Br0MhNN9901xbHZhOwFdG0aUAg7A7ruc" },
    { type: "image", caption: "Bekal Fort",          span: "wide",  img: "https://lh3.googleusercontent.com/d/1w-CMo8jT_Dv_JEbuFFuSic3jq9UBtH8O" },
    { type: "image", caption: "Athirapally Falls",   span: "tall",  img: "https://lh3.googleusercontent.com/d/1hxpg0qEZiGqXuNLJFBqEtT5wI-HYsIJv" },
    { type: "image", caption: "Poovar Island",       span: "wide",  img: "https://lh3.googleusercontent.com/d/1oT983p553TN0Ewzt--BJNRVCMJdujcgH" },
    { type: "image", caption: "Ponmudi Hills",       span: "tall",  img: "https://lh3.googleusercontent.com/d/1H-a27uca1MpFaemNvCmKsnNN8IzzcHXQ" },
    { type: "image", caption: "Marari Beach",        span: "wide",  img: "https://lh3.googleusercontent.com/d/1SxxavzxE0-_HsIu11285amZpF9EGI4D3" },
    { type: "image", caption: "Kerala Sunset",                      img: "https://lh3.googleusercontent.com/d/1vSDvnK_SKLDrPuXo4Z-3xFCWcEvtMzGI" },
    { type: "image", caption: "God's Own Country",   span: "wide",  img: "https://lh3.googleusercontent.com/d/1fgU7af1OaPvnxU7doB2Tr1Y821byXnaZ" },
  ]},
  5: { items: [
    { type: "image", caption: "Palolem Beach",     span: "tall",  img: "https://lh3.googleusercontent.com/d/1LNRSuhqlp095-0mZv5wA2C5R9voXCsWz" },
    { type: "image", caption: "Golden Dunes",      span: "wide",  img: "https://lh3.googleusercontent.com/d/1zp-P2W5CczD7wsI1r3uFEJkeyEXfkNuS" },
    { type: "quote", text: "The ocean stirs the heart, inspires the imagination and brings eternal joy to the soul.", author: "Wyland" },
    { type: "image", caption: "Sunset at Vagator", span: "tall",  img: "https://lh3.googleusercontent.com/d/1tpCPAxvRxIHdLH1HuXpDFo9qgyHV8KBM" },
    { type: "image", caption: "Old Goa Church",    span: "wide",  img: "https://lh3.googleusercontent.com/d/15sf-1r2mCO2bnlbIjGuAliflUqz3ft-q" },
    { type: "image", caption: "Beach Shacks",      span: "tall",  img: "https://lh3.googleusercontent.com/d/1htrI8OZlRSG2jYWstg8SpWnIMQadN005" },
    { type: "image", caption: "Spice Plantation",                  img: "https://lh3.googleusercontent.com/d/1gro-M6eYTOpueP-wI4LGYBnmaXoQYqAy" },
    { type: "quote", text: "Life is better in flip flops.", author: "" },
    { type: "image", caption: "Anjuna Flea Market",span: "wide",  img: "https://lh3.googleusercontent.com/d/1utkhCpZhwPnPiA8AkhpnJ4M1qdsksNoU" },
    { type: "image", caption: "Dudhsagar Falls",   span: "tall",  img: "https://lh3.googleusercontent.com/d/1YXC7A3MNJInIo7Cu-EpfsFULWa7Ss0Uo" },
    { type: "image", caption: "Arambol Sunrise",   span: "wide",  img: "https://lh3.googleusercontent.com/d/1k6zk6EKgkKBDw_CviN0Mv2WilX3NMzbd" },
  ]},
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [], 
  12: [],
  // 6: { items: [
  //   { type: "image", caption: "French Quarter Lanes", span: "tall",  img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=80" },
  //   { type: "image", caption: "Promenade Beach",      span: "small", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
  //   { type: "quote", text: "Paris of the East — every lane tells a story of two worlds.", author: "" },
  //   { type: "image", caption: "Bougainvillea Walls",  span: "wide",  img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80" },
  //   { type: "image", caption: "Auroville",            span: "small", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" },
  //   { type: "image", caption: "Temple Gopuram",       span: "tall",  img: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=900&q=80" },
  //   { type: "quote", text: "Not all classrooms have four walls — some have cobblestones and café tables.", author: "" },
  //   { type: "image", caption: "Sunrise Seafront",     span: "wide",  img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80" },
  // ]},
  // 7: { items: [
  //   { type: "image", caption: "Red Fort",           span: "tall",  img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80" },
  //   { type: "image", caption: "Humayun's Tomb",     span: "small", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80" },
  //   { type: "quote", text: "Delhi is not a city, it is an emotion.", author: "" },
  //   { type: "image", caption: "Jama Masjid",        span: "wide",  img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
  //   { type: "image", caption: "Chandni Chowk",      span: "small", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80" },
  //   { type: "image", caption: "Qutub Minar",        span: "tall",  img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
  //   { type: "quote", text: "History is not the past. It is the present. We carry our history with us.", author: "James Baldwin" },
  //   { type: "image", caption: "India Gate at Dusk", span: "wide",  img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=80" },
  // ]},
  // 8: { items: [
  //   { type: "image", caption: "Meenakshi Temple",     span: "tall",  img: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=900&q=80" },
  //   { type: "image", caption: "Shore Temple",         span: "small", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
  //   { type: "quote", text: "A culture is made or destroyed by its articulate voices.", author: "Ayn Rand" },
  //   { type: "image", caption: "Chettinad Mansion",    span: "wide",  img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
  //   { type: "image", caption: "Ooty Nilgiris",        span: "small", img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=80" },
  //   { type: "image", caption: "Kanyakumari",          span: "tall",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
  //   { type: "quote", text: "Music gives a soul to the universe, wings to the mind and life to everything.", author: "Plato" },
  //   { type: "image", caption: "Brihadeeswara Temple", span: "wide",  img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
  // ]},
  // 9: { items: [
  //   { type: "image", caption: "Rock Garden",           span: "tall",  img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=900&q=80" },
  //   { type: "image", caption: "Sukhna Lake",           span: "small", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" },
  //   { type: "quote", text: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
  //   { type: "image", caption: "Le Corbusier Centre",   span: "wide",  img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80" },
  //   { type: "image", caption: "Rose Garden",           span: "small", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" },
  //   { type: "image", caption: "Capitol Complex",       span: "tall",  img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
  //   { type: "quote", text: "Architecture is the art of how to waste space beautifully.", author: "Philip Johnson" },
  //   { type: "image", caption: "Nek Chand Sculptures",  span: "wide",  img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80" },
  // ]},
  // 10: { items: [
  //   { type: "image", caption: "Hampi Ruins",   span: "tall",  img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80" },
  //   { type: "image", caption: "Coorg Hills",   span: "small", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
  //   { type: "quote", text: "Ruins are not a sign of decay, but of a life fully lived.", author: "" },
  //   { type: "image", caption: "Mysore Palace", span: "wide",  img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
  //   { type: "image", caption: "Jog Falls",     span: "small", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80" },
  //   { type: "image", caption: "Gokarna Beach", span: "tall",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
  //   { type: "quote", text: "Coffee is a language in itself.", author: "Jackie Chan" },
  //   { type: "image", caption: "Badami Caves",  span: "wide",  img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
  // ]},
  // 11: { items: [
  //   { type: "image", caption: "Tirupati Temple",     span: "tall",  img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&q=80" },
  //   { type: "image", caption: "Araku Valley",        span: "small", img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=80" },
  //   { type: "quote", text: "Faith is taking the first step even when you don't see the whole staircase.", author: "Martin Luther King Jr." },
  //   { type: "image", caption: "Visakhapatnam Coast", span: "wide",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
  //   { type: "image", caption: "Lepakshi Murals",     span: "small", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
  //   { type: "image", caption: "Borra Caves",         span: "tall",  img: "https://images.unsplash.com/photo-1534377075-38d9e14ce2dd?w=900&q=80" },
  //   { type: "quote", text: "Every coastline holds a story that the ocean has been whispering for centuries.", author: "" },
  //   { type: "image", caption: "Kondapalli Craft",    span: "wide",  img: "https://images.unsplash.com/photo-1580500255834-9a7a5e388668?w=900&q=80" },
  // ]},
  // 12: { items: [
  //   { type: "image", caption: "Charminar at Dusk",  span: "tall",  img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&q=80" },
  //   { type: "image", caption: "Golconda Fort",      span: "small", img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
  //   { type: "quote", text: "Biryani is not just food — it is the soul of a city served on a plate.", author: "" },
  //   { type: "image", caption: "Hussain Sagar Lake", span: "wide",  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" },
  //   { type: "image", caption: "Warangal Kakatiya",  span: "small", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
  //   { type: "image", caption: "Ramoji Film City",   span: "tall",  img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80" },
  //   { type: "quote", text: "History has a way of speaking louder in the places it was made.", author: "" },
  //   { type: "image", caption: "Laad Bazaar",        span: "wide",  img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80" },
  // ]},
};

/* ── Animation variants ─────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Scroll-reveal wrapper ──────────────────────────────────────── */
function Reveal({ children }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Image tile ─────────────────────────────────────────────────── */
function ImageTile({ item, color }) {
  return (
    <Reveal>
      <div className={`pg-tile pg-tile--${item.span}`} style={{ "--tile-color": color }}>
        {item.img ? (
          <img src={item.img} alt={item.caption} draggable={false} referrerPolicy="no-referrer" crossOrigin="anonymous" />
        ) : (
          <div className="pg-tile-placeholder">
            <span className="pg-tile-plus">+</span>
            <span className="pg-tile-add">Add photo</span>
          </div>
        )}
        <div className="pg-tile-overlay" />
        <div className="pg-tile-caption">
          <span className="pg-tile-name">{item.caption}</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Quote block ────────────────────────────────────────────────── */
function QuoteBlock({ item }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="pg-quote"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      <motion.span
        className="pg-quote-bar"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.blockquote
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.22 }}
      >
        "{item.text}"
      </motion.blockquote>
      {item.author && (
        <motion.cite
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          — {item.author}
        </motion.cite>
      )}
    </motion.div>
  );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function TravelDetail() {
  const { id }       = useParams();
  const transitionTo = usePageTransition();
  const spot         = travels.find((t) => t.id === Number(id));

  if (!spot) {
    return (
      <div className="td-notfound">
        <p>Destination not found.</p>
        <button onClick={() => transitionTo("/travel")}>← Back to travels</button>
      </div>
    );
  }

  const idx     = travels.indexOf(spot);
  const prevDst = travels[idx - 1] ?? null;
  const nextDst = travels[idx + 1] ?? null;
  const gallery = galleryData[spot.id];

  return (
    <>
      <FogEffect />
      <AmbientEffect place={spot.place} />
      <Header />

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <div className="td-hero" style={{ "--accent": spot.color }}>
        <motion.img
          key={spot.id}
          src={spot.img}
          alt={spot.place}
          className="td-hero-img"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
        <div className="td-hero-overlay" />
        <motion.span
          className="td-hero-tag"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {spot.tag}
        </motion.span>
      </div>

      {/* ══ PLACE INFO ══════════════════════════════════════════ */}
      <motion.section
        className="td-content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="td-breadcrumb">
          <button className="td-back" onClick={() => transitionTo("/travel")}>
            ← All Travels
          </button>
          <span className="td-index">
            {String(idx + 1).padStart(2, "0")} / {String(travels.length).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="td-place">
          {spot.place}
        </motion.h1>

        <motion.span variants={fadeUp} className="td-country">
          {spot.country}
        </motion.span>

        <motion.p variants={fadeUp} className="td-desc">
          {spot.description}
        </motion.p>

        <motion.div
          className="td-line"
          variants={{
            hidden: { scaleX: 0 },
            show:   { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
          }}
          style={{ background: spot.color }}
        />
      </motion.section>

      {/* ══ PHOTO DIARY HEADING ═════════════════════════════════ */}
      <motion.div
        className="td-gallery-header"
        style={{ "--accent": spot.color }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="td-gallery-eyebrow">photo diary</span>
        <div className="td-gallery-title-wrap">
          {spot.place.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="td-gallery-char"
              style={{ color: i === 0 ? spot.color : "#fff" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="td-gallery-rule"
          style={{ background: spot.color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        />
      </motion.div>

      {/* ══ MASONRY GALLERY ═════════════════════════════════════ */}
      {gallery?.items?.length > 0 ? (
        <section className="pg-grid">
          {gallery.items.map((item, i) =>
            item.type === "quote" ? (
              <QuoteBlock key={`q-${i}`} item={item} />
            ) : (
              <ImageTile key={`img-${i}`} item={item} color={spot.color} />
            )
          )}
        </section>
      ) : (
        <motion.div
          className="td-gallery-empty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="td-gallery-empty-icon">📷</span>
          <p className="td-gallery-empty-title">Stay tuned</p>
          <p className="td-gallery-empty-sub">Uploading soon…</p>
        </motion.div>
      )}

      {/* ══ PREV / NEXT NAV ═════════════════════════════════════ */}
      <motion.div
        className="td-nav"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {prevDst ? (
          <button
            className="td-nav-btn td-nav-btn--prev"
            onClick={() => transitionTo(`/travel/${prevDst.id}`)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            <span>{prevDst.place}</span>
          </button>
        ) : <div />}

        {nextDst ? (
          <button
            className="td-nav-btn td-nav-btn--next"
            onClick={() => transitionTo(`/travel/${nextDst.id}`)}
          >
            <span>{nextDst.place}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ) : <div />}
      </motion.div>

      <footer className="td-footer">
        <span>© hari · {spot.place} memories</span>
      </footer>
    </>
  );
}
