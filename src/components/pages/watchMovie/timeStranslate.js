 const timeTranslate = (time) => {
    const timeSplit = time.split(" ");
    const timeNumber = timeSplit[0];
    const timeTextFirst = timeSplit[1];
    const timeTextSecond = timeSplit[2];
  
    if (time === "a few seconds") {
      return <>Vài giây trước</>;
    }
    let timetranslate = null;
    switch (time) {
      case `${timeNumber} minutes`:
        timetranslate = `${timeNumber} phút trước `;
        break;
      case `${timeNumber} minute`:
        timetranslate = `1 phút trước `;
        break;
      case `${timeNumber} hours`:
        timetranslate = `${timeNumber} giờ trước `;
        break;
      case `an hour`:
        timetranslate = `1 giờ trước `;
        break;
      default:
        timetranslate = time;
    }
    return <>{timetranslate}</>;
  };
  export default timeTranslate