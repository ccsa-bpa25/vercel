

function calenderEvents(year, month) {
    
let events =[];
    const dataArray=[];
    const firstDay = new Date(year, month, 1);
    
    const lastDay = new Date(year, month + 1, 0);
    //const efirstDayT = new Date(eyear, emonth, 1);
    const isoString1 = firstDay.toISOString(); // Converts to ISO string
    const efirstDay = isoString1.split('T')[0];
   
    
    //const elastDayT = new Date(eyear, emonth + 1, 0);
    const isoString2 = lastDay.toISOString(); // Converts to ISO string
    const elastDay = isoString2.split('T')[0];
    
    // Initialize the Supabase client
const supabaseUrl = 'https://bolarxblzgmnwsxirgta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbGFyeGJsemdtbndzeGlyZ3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MzMwMTMsImV4cCI6MjA1NjEwOTAxM30.io1oJ9utYZn37JcwvKhJBJZdqAs-n6_07k9faKV5DsE';
    
  
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// Query rows from a table
async function getRows() {
  const { data, error } = await supabase
    .from('events') // Replace with your table name
    .select('*') // Adjust columns to query if needed
    .gte('eventdate',efirstDay)
    .lte('eventdate',elastDay);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Rows:', data);
       //dataArray = data.map
     // console.log('dataArray:',dataArray);
      events = data.map(item => {
    return {
        title: item.name, // Rename 'name' to 'fullName'
        date: item.eventdate,      // Rename 'age' to 'years'
        details: item.description,
        id:item.id
    };
});
      
      const specialDays = data.map(item => item.eventdate);
      
      console.log('events:',events);
          console.log('specialdays',specialDays);
  }
}

// Call the function
getRows();

    console.log("In Function");
  


    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const date = new Date();
  
    console.log("In Function2");
  
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
  //console.log('currentDay',currentDay);
     
        let dayYear = currentDay.getFullYear();
       // let dayMonth = (currentDate.getMonth() + 1).toString(); 
        let dayNumber = currentDay.getDate();
        
        let syear =dayYear.toString();
        let smonth = (currentDate.getMonth() + 1).toString(); 
        //let smonth=month.toString();
    smonth = smonth.padStart(2, '0');
        
        let sday = dayNumber.toString(); 
        //let smonth=month.toString();
    sday = sday.padStart(2, '0');
    
        
       //---- 
     
                //const hasEvent = events.some(event => new Date(event.date).getDate() === dayNumber);
                const exactDate = syear+"-"+smonth+"-"+sdayNumber;
                const stexactDate=exactDate.toString();
                console.log(exactDate);

                const hasEvent = events.some(event => {
    const eventDate = new Date(event.date).toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
    return eventDate === exactDate;
                    
                    
});
                
                
                //const eventClass = hasEvent ? 'event-day' : '';
                //console.log('event-day');
                //calendarHTML += `<td class="${eventClass}" onclick="openEventModal(${dayNumber},'${stexactDate}')">${dayNumber}</td>`;
            }
      //-----------  
        
        
      //const dayDiv = document.createElement("div");
      // dayDiv.className = "day";
      // Sept 12, 2024
      if (year === 2024 && month === 8 && day === 12) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "September 12, 2024<br><br>First Middle Level BPA Meeting of the 2024 - 2025 school year<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4:30 PM"
          );
        });
      }
      // Sept 27, 2024
      if (year === 2024 && month === 8 && day === 17) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "September 17, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Sept 23, 2024
      if (year === 2024 && month === 8 && day === 23) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "September 23, 2024<br><br>Election Presentation Slides Deadline<br><br>If you are running for a BPA officer position, submit your slides to Ms. Mercer"
          );
        });
      }
      // Sept 24, 2024
      if (year === 2024 && month === 8 && day === 24) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "September 24, 2024<br><br>BPA Officer Elections<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4:30 PM"
          );
        });
      }
      // Sept 26, 2024
      if (year === 2024 && month === 8 && day === 26) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "September 26, 2024 - 29, 2024<br><br>Student Leadership Summit<br><br>Location: Washington, D.C.<br><br>Registration Opens: July 1, 2024 8 AM EST<br><br> Registration Closes: August 30, 2024 5 PM EST<br><br>For more information click <a href='https://bpa.org/student-leadership-summit/' style='color: blue;'>here"
          );
        });
      }
      //  Sept 27, 2024
      if (year === 2024 && month === 8 && day === 27) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 27, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            " September 26, 2024 - 29, 2024<br><br>Student Leadership Summit<br><br>Location: Washington, D.C.<br><br>Registration Opens: July 1, 2024 8 AM EST<br><br> Registration Closes: August 30, 2024 5 PM EST<br><br>For more information click <a href='https://bpa.org/student-leadership-summit/' style='color: blue;'>here"
          );
        });
      }
      //  Sept 28, 2024
      if (year === 2024 && month === 8 && day === 28) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            " September 26, 2024 - 29, 2024<br><br>Student Leadership Summit<br><br>Location: Washington, D.C.<br><br>Registration Opens: July 1, 2024 8 AM EST<br><br> Registration Closes: August 30, 2024 5 PM EST<br><br>For more information click <a href='https://bpa.org/student-leadership-summit/' style='color: blue;'>here"
          );
        });
      }
      //  Sept 29, 2024
      if (year === 2024 && month === 8 && day === 29) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            " September 26, 2024 - 29, 2024<br><br>Student Leadership Summit<br><br>Location: Washington, D.C.<br><br>Registration Opens: July 1, 2024 8 AM EST<br><br> Registration Closes: August 30, 2024 5 PM EST<br><br>For more information click <a href='https://bpa.org/student-leadership-summit/' style='color: blue;'>here"
          );
        });
      }
      // Oct 1, 2024
      if (year === 2024 && month === 9 && day === 1) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "October 1, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Oct 8, 2024
      if (year === 2024 && month === 9 && day === 8) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "October 8, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Oct 15, 2024
      if (year === 2024 && month === 9 && day === 15) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "October 15, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Oct 22, 2024
      if (year === 2024 && month === 9 && day === 22) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "October 22, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Oct 29, 2024
      if (year === 2024 && month === 9 && day === 29) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "October 29, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      //  Oct 30, 2024
      if (year === 2024 && month === 9 && day === 30) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            " October 30, 2024<br><br>Delaware CTSO Middle School Fall Leadership Conference<br><br>Location: Clayton Hall (100 David Hollowell Drive) on University of Delaware Campus <br><br>Middle Level Officers will attend this conference to learn and gain new skills!<br><br>To learn more about the Middle Level Fall Leadership Conference visit the <a href='fall.html' style='color: blue;'>FLC page</a>."
          );
        });
      }
      //  Oct 31, 2024
      if (year === 2024 && month === 9 && day === 31) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            " October 31, 2024<br><br>Delaware CTSO High School Fall Leadership Conference<br><br>Location: Clayton Hall (100 David Hollowell Drive) on University of Delaware Campus <br><br>Secondary Level Officers will attend this conference to learn and gain new skills!."
          );
        });
      }
      // Nov 5, 2024
      if (year === 2024 && month === 10 && day === 5) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "November 5, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Nov 12, 2024
      if (year === 2024 && month === 10 && day === 12) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "November 12, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Nov 13, 2024
      if (year === 2024 && month === 10 && day === 13) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "November 5, 2024<br><br>BPA ML Officers Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 10:21 AM - 10:45 AM"
          );
        });
      }
      // Nov 19, 2024
      if (year === 2024 && month === 10 && day === 19) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "November 19, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Nov 26, 2024
      if (year === 2024 && month === 10 && day === 26) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "November 26, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Dec 1, 2024
      if (year === 2024 && month === 11 && day === 1) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "December 1, 2024<br><br>National Virtual Events Registration Deadline at 5:00 PM EST<br><br>Payment varies for different events. <br><br>Check 2024-2025 Middle Level WSAP guidelines for more information.<br><br>Your chapter advisor should register you on the BPA advisor site.<br><br> For more information, ask your chapter advisor."
          );
        });
      }
      // Dec 3, 2024
      if (year === 2024 && month === 11 && day === 3) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "December 3, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Dec 10, 2024
      if (year === 2024 && month === 11 && day === 10) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "December 10, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Dec 17, 2024
      if (year === 2024 && month === 11 && day === 17) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "December 17, 2024<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Jan 3 2025
      if (year === 2025 && month === 0 && day === 3) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "January 3, 2025:<br><br>National Conference Pin Contest Deadline<br><br>Submit your pin design entry <a href='https://members.bpa.org/2025-nlc-pin-design-contest/' style='color: blue;' target='_blank'>here</a>  <br><br>For rules, judging, and guidelines click <a href='https://members.bpa.org/wp-content/uploads/sites/5/2024/10/NLC-2025-Pin-Design-Contest.pdf' style='color: blue;' target='_blank'>here"
          );
        });
      }
      // Jan 7, 2024
      if (year === 2025 && month === 0 && day === 7) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "January 7, 2025<br><br>Regularly Scheduled BPA Meeting<br><br>Where: CCSA<br><br>Room: 105 (Ms. Mercer)<br><br>Time: 2:30 PM - 4: 30 PM"
          );
        });
      }
      // Jan 10 2025
      if (year === 2025 && month === 0 && day === 10) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "January 10, 2025 at 5:00 PM EST<br><br>Presubmission Events Deadline<br><br>Check the WSAP Guidelines on for what you need to submit for your event<br><br>Submissions vary for events<br><br>Give your advisor the release forms and works cited (if need for your event) and the link to your project and video(if needed)"
          );
        });
      }
      // Jan 15 2025
      if (year === 2025 && month === 0 && day === 15) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "January 15, 2025:<br><br>National Virtual Events Presubmission Deadline at 5:00 PM EST<br><br>Objective Testing Day<br><br>Students who are registered in objective test events, will take the test according to the Buddy School System<br><br>Student Limit: 3 students per school, per event<br><br>Tests will be monitored as per the normal buddy school rules"
          );
        });
      }
      // feb 5 2025
      if (year === 2025 && month === 1 && day === 5) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "February 5, 2025:<br><br>Middle Level State Leadership Conference<br><br>For more information, look at the SLC page <a href='state.html' style='color: blue;'>SLC page "
          );
        });
      }
      // feb 6 2025
      if (year === 2025 && month === 1 && day === 6) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "February 6, 2025:<br><br>Secondary Level State Leadership Conference<br><br>For more information, look at the SLC page <a href='state.html' style='color: blue;'>SLC page "
          );
        });
      }
      // feb 28 2025
      if (year === 2025 && month === 1 && day === 28) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "February 28, 2025:<br><br>National Leadership Conference Registration Opens at 8 AM EST"
          );
        });
      }
      // march 14 2025
      if (year === 2025 && month === 2 && day === 14) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "March 14, 2025:<br><br>Awards Deadlines at 5:00 PM EST<br><br>Scholarships Deadlines at 5:00 PM EST<br><br>Certification Deadlines at 5 PM EST"
          );
        });
      }
      // march 28 2025
      if (year === 2025 && month === 2 && day === 28) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "March 28, 2025:<br><br>National Leadership Conference Registration Deadline at 5 PM EST"
          );
        });
      }
      // april 1 2025
      if (year === 2025 && month === 3 && day === 1) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "April 1, 2025:<br><br>National Level Presubmission Events Deadline at 5:00 PM"
          );
        });
      }
      // april 17 2025
      if (year === 2025 && month === 3 && day === 17) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "April 17, 2025:<br><br>National Leadership Conference Payments Deadline at 5:00 PM EST"
          );
        });
      }
      // april 24 2025
      if (year === 2025 && month === 3 && day === 24) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "April 24, 2025:<br><br>National Leadership Conference Refund Request Deadline at 5:00 PM EST"
          );
        });
      }
      // may 7  2025
      if (year === 2025 && month === 4 && day === 7) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "May 7, 2025 - May 11, 2025:<br><br>National Leadership Conference<br><br>For more information, look at the <a href='national.html' style='color: blue;'>NLC page"
          );
        });
      }
      // may 8  2025
      if (year === 2025 && month === 4 && day === 8) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "May 7, 2025 - May 11, 2025:<br><br>National Leadership Conference<br><br>For more information, look at the <a href='national.html' style='color: blue;'>NLC page"
          );
        });
      }
      // may 8  2025
      if (year === 2025 && month === 4 && day === 8) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "May 7, 2025 - May 11, 2025:<br><br>National Leadership Conference<br><br>For more information, look at the <a href='national.html' style='color: blue;'>NLC page"
          );
        });
      }
      // may 9  2025
      if (year === 2025 && month === 4 && day === 9) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "May 7, 2025 - May 11, 2025:<br><br>National Leadership Conference<br><br>For more information, look at the <a href='national.html' style='color: blue;'>NLC page"
          );
        });
      }
      // may 10  2025
      if (year === 2025 && month === 4 && day === 10) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "May 7, 2025 - May 11, 2025:<br><br>National Leadership Conference<br><br>For more information, look at the <a href='national.html' style='color: blue;'>NLC page"
          );
        });
      }
      // may 11  2025
      if (year === 2025 && month === 4 && day === 11) {
        console.log("In Function3");
        const calendardays = document.getElementById("calendar-days");
        const dayId = day.toString() + month.toString() + year.toString();
        console.log("ElementId :" + dayId);
        const dayDiv = document.getElementById(dayId);
        dayDiv.title = "Special Day: Sept 26, 2024";
        dayDiv.className = "special-day";
        dayDiv.addEventListener("click", function () {
          showModal(
            "May 7, 2025 - May 11, 2025:<br><br>National Leadership Conference<br><br>For more information, look at the <a href='national.html' style='color: blue;'>NLC page"
          );
        });
      }
      /*
   
    
      }
          */
  
      //dayDiv.textContent = day;
      //daysDiv.appendChild(dayDiv);
    }
  //}
  
