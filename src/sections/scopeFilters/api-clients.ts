// @ts-ignore
//import { authentication } from "helpers/react-auth";
//import appConfig from "helpers/config-helper";
import moment from 'moment-timezone';
//import { IncidentTimeZoneInput } from "sections/observation/redux/model";

//const config = appConfig();
//const baseUrl = config.REACT_APP_BASE_API ? config.REACT_APP_BASE_API : "";
const baseUrl  = "https://localhost:7181/api/"
const getTimeZone = () => {
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timezone) {
    timezone = moment.tz.guess();
  }
  return timezone;
}

export const post = (relativeUrl: string, data?: any) => {
  const token = "eyJraWQiOiJHdkZOY2hoQ2J3V1oyazFOckNiWTNJWU1FQi1Vbi1zS0U5aFVEN0tjaXI4IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULk96Vl9nWWVmZmsyTzBTZ3l3ak9nNzBOWEw1Vm5Ib1pBa2JKYWpnVklRdE0iLCJpc3MiOiJodHRwczovL2xvZ2luLXVhdC5jYnJlLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3NDI5ODA4NzAsImV4cCI6MTc0Mjk4NDQ3MCwiY2lkIjoiMG9hMW9yZmU0amRWbkxCUDYwaDgiLCJ1aWQiOiIwMHUyNDBud2w5cE1PYUZNTzBoOCIsInNjcCI6WyJwcm9maWxlIiwib3BlbmlkIiwiZW1haWwiXSwiYXV0aF90aW1lIjoxNzQyOTc0OTM5LCJsYXN0TmFtZSI6IlVwcmV0aSIsInN1YiI6IkFiaGluYXYuVXByZXRpQGNicmUuY29tIiwiZmlyc3RuYW1lIjoiQWJoaW5hdiIsInVwbiI6IkFiaGluYXYuVXByZXRpQGNicmUuY29tIiwidW5pcXVlX25hbWUiOiJBYmhpbmF2LlVwcmV0aUBjYnJlLmNvbSIsIm5hbWUiOiJBYmhpbmF2IFVwcmV0aSIsImxvY2FsZSI6ImVuX1VTIn0.Xx_V0kccFwnBqY_U73IoTS_DZpaRGnhv0_acNy4GnO9J-nxS53DXtibp0ngRkEUf8n-bVLZ2H5vyxwa7Penu4axOoP-34ZR-JdspWzbuyS0XrR6UgVu55uZtSaceeSeYMOfhRVU75C1kNn-JREwDD8_i-00aB8hLn1_n8h--v2JHKBtzTMdiolMU8kvUl6TZoFWo7ueiDvo38YtQLXauU3mAQ40LgfgV9-N34rT9JicCwncEJfuv2fVBd83-jOFr_ehOIr1K4LU489ydHzFmqQ3npjknOxN3zjKdYR7vyXe60lN2gaydkGQdL9NEc8pO_Hj0OdFVDsK4jzHTMLCTlw"
  let statusCode = 200;
  const payloadData = data && { ...data, timezone: getTimeZone() }
  return fetch(relativeUrl, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(payloadData), // body data type must match "Content-Type" header
  }).then((response) => {
    statusCode = response.status;
    return response.json()
  }).catch(error => error)
    .then(data => {
      data.status = statusCode;
      return data
    })
}

export const remove = (relativeUrl: string, data?: any) => {
  const token = ""
  let statusCode = 200;
  return fetch(baseUrl + relativeUrl, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((response) => {
    statusCode = response.status;
    return response.json()
  }).catch(error => error)
    .then(data => {
      data.status = statusCode;
      return data
    })
}
export const get = (relativeUrl: string) => {
  const token = "ss"
  let statusCode = 200;
  return fetch(relativeUrl, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  }).then((response) => {
    statusCode = response.status;
    return response.json();
  }).catch(error => error)
    .then(data => {
      data.status = statusCode;
      return data;
    })
}


export const put = (relativeUrl: string, data?: any) => {
  const token = "ss"
  const payloadData = data && { ...data, timezone: getTimeZone() }
  let statusCode = 200;
  return fetch(baseUrl + relativeUrl, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(payloadData), // body data type must match "Content-Type" header
  }).then((response) => {
    statusCode = response.status;
    return response.json();
  }).catch(error => error)
    .then(data => {
      data.status = statusCode;
      return data;
    })
}

export const fetchTimezone = (locationDetails: any) => {
  const { latitude, longitude, timeStamp, apiKey } = locationDetails;
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timeStamp}&key=${apiKey}`;

  return fetch(url).then((response) => {
    return response.json();
  }).catch(error => error)
    .then(data => {
      return data;
    })

};

