
console.log(
    "%cWelcome to Nodemy ✋✋✋",
    "background-color: #badc58 ; color: white ; font-weight: bold ; " +
    "font-size: 20px ; font-style: italic ; text-decoration: underline ; " +
    "font-family: 'american typewriter' ; text-shadow: 1px 1px 3px black ;"
);

// NOTE: In this demo, inline-block isn't needed in Chrome; but, it is needed in
// Firefox or the block properties, like padding, don't work. Trying to use
// "block" will work in Chrome; but, will go full-width in Firefox.
console.log(
    "%cHello 😊 😊 😊 ",
    "display: inline-block ; border: 3px solid #12CBC4 ; border-radius: 7px ; " +
    "padding: 10px ; margin: 20px ;"
);

// NOTE: Background-images work in Chrome, but not in Firefox. Also, at least
// locally, only fully qualified URLs seems to work (but that may have been
// something I was messing up).
// --
// Also, it doesn't look like width/height work on box-model. As such, I am using
// padding to push-out the box size.
console.log(
    "%cNodemy",
    "display: inline-block ; background-image: url( 'data:image/jpeg;base64,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' ) ; " +
    "background-size: cover ; padding: 10px 175px 158px 10px ; " +
    "border: 2px solid black ; font-size: 11px ; line-height: 11px ; " +
    "font-family: monospace ;"
);

// The same CSS styling can be used with many of the other console methods, like
// the .group() method.
console.group(
    "%chttps://nodemy.vn/",
    "background-color: #12CBC4 ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
);
// console.log( "Groups are cool for grouped stuff." );
// console.log( "Totes magotes" );
console.groupEnd();