

function calenderEvents(year, month) {
    //
let events =[];
    const dataArray=[];
    const specialDays=[];
    //const exactDate='';
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
      
      let specialDays = data.map(item => item.eventdate);
      
      console.log('events:',events);
          console.log('specialdays',specialDays);
      
      const daysInMonth = new Date(year, month + 1, 0).getDate();
    const date = new Date(year, month, 1);
  
  
  
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
  //console.log('currentDay',currentDay);
     
        let dayYear = currentDay.getFullYear();
       // let dayMonth = (currentDate.getMonth() + 1).toString(); 
        let dayNumber = currentDay.getDate();
        
        let syear =dayYear.toString();
        let smonth = (currentDay.getMonth() + 1).toString(); 
        //let smonth=month.toString();
    smonth = smonth.padStart(2, '0');
        
        let sday = dayNumber.toString(); 
        //let smonth=month.toString();
    sday = sday.padStart(2, '0');
    
        
       //---- 
     
                //const hasEvent = events.some(event => new Date(event.date).getDate() === dayNumber);
                const exactDate = syear+"-"+smonth+"-"+sday;
                const stexactDate=exactDate.toString();
                console.log(exactDate);

               /* const hasEvent = events.some(event => {
    const eventDate = new Date(event.date).toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
    console.log(eventDate,eventDate);
                    return eventDate === exactDate;
                    
                    
});
                
                console.log('eventdate',hasEvent.toString());*/
        
    

const exists = specialDays.includes(exactDate);
console.log(`Does ${exactDate} exist?`, exists); // Output: true

  }
}

// Call the function
getRows();

    

    
                //const eventClass = hasEvent ? 'event-day' : '';
                //console.log('event-day');
                //calendarHTML += `<td class="${eventClass}" onclick="openEventModal(${dayNumber},'${stexactDate}')">${dayNumber}</td>`;
            }
      //-----------  
        
        
      //const dayDiv = document.createElement("div");
      // dayDiv.className = "day";
      // Sept 12, 2024
      /*if (year === 2024 && month === 8 && day === 12) {
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
      }*/
  
     
      /*
   
    
      }
          */
  
      //dayDiv.textContent = day;
      //daysDiv.appendChild(dayDiv);
    }
  //}
  
