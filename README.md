### 📊 2. Real-Time Twitter Analytics Dashboard (Power BI)

**📉 Visualization**: Grouped Bar Chart  

**🔍 Description**:  
This visualization presents a **grouped bar chart** comparing:
- **Average Rating**
- **Total Review Count**

...across the **top 10 app categories by number of installs**.

**📋 Applied Filters**:
- **Average rating ≥ 4.0**
- **App size ≥ 10 MB**
- **Last updated in January**

**🕒 Time-Based Visibility Rule**:
- This chart is **only displayed between 3:00 PM – 5:00 PM IST**
- Outside this time range, the chart is hidden from the dashboard

**⚙️ Tools Used**:
- **Microsoft Power BI**
- **DAX Expressions** for time-based visibility control

**🧠 DAX Logic Sample**:
```dax
ShowGraphFlag = 
VAR CurrentTime = TIME(HOUR(NOW()), MINUTE(NOW()), 0)
RETURN IF(CurrentTime >= TIME(15, 0, 0) && CurrentTime <= TIME(17, 0, 0), 1, 0)
