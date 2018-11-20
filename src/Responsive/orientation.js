export default (orientation) => {
  const screenWidth = screen.width;
  const browserInfo = clientInformation.appVersion;
  const { angle, type } = screen.orientation;
  //==========================================
  const mobileCheck = browserInfo.toLowerCase().includes("mobile");
  const widthCheck = screenWidth < 815;
  const tabletWidthCheck = screenWidth < 850 && screenWidth > 480;
  const deviceToggleCheck = browserInfo.toLowerCase().includes("nexus");
  const angleCheck = angle === 90;
  const landscapeCheck = type.toLowerCase().includes("landscape");
  const requestLandscape = !!orientation && orientation.toLowerCase() === "landscape";
  //==========================================
  const mobileLandscape =
    requestLandscape &&
    landscapeCheck &&
    mobileCheck &&
    !deviceToggleCheck &&
    widthCheck &&
    angleCheck;
  const mobileDesktopLandscapeCheck =
    requestLandscape &&
    landscapeCheck &&
    mobileCheck &&
    deviceToggleCheck &&
    widthCheck &&
    angleCheck;

  const tabletDesktopCheck =
    requestLandscape &&
    !landscapeCheck &&
    mobileCheck &&
    deviceToggleCheck &&
    tabletWidthCheck &&
    !angleCheck;

  if ( !!orientation ) {
    if ( mobileLandscape ) {
      return true;
    } else if ( mobileDesktopLandscapeCheck ) {
      return true;
    } else if ( tabletDesktopCheck ) {
      return true;
    } else {
      return false;
    }
  } else {
    return null;
  }

};