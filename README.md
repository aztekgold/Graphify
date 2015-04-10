# graph
Jquery Graph Plugin Development

New to Github so could use help with usage and how to update and label revisions.

Usage 

HTML
```HTML
<canvas id="graph" width="width" height="height"></canvas>
```
  
Javascript/Jquery
```JAVASCRIPT
    $('#graph').graphify{
        data[
            [54,74,86,100,14,77,18,80,42,61,90,38,0,14,72]
        ]
     }
  ```


Advanced Usage
```JAVASCRIPT
    $('#graph').graphify{
      data[
        [54,74,86,100,14,77,18,80,42,61,90,38,0,14,72], // Array per graph
        [50,63,62,52,66,94,15,1,17,37,2,8,99,62,64]
      ],
      lineColors: [ //Array of Color(s) per dataset
        ["#3498DB", "#ff0000"], //Two Values Gives Gradient Line
        ["#9B59B6"] 
      ],
      yAxisPoints: 5, // Number of y-axis grid lines and y-axis labels
      yPadding: 80, // Vertical Padding
      xPadding: 60, // Horizontal Padding
      backgroundColor: #343434, // Chart background Color
      axisColor: #aaa, // Color of X and Y axis 
      gridLineColor: #666 // Color of grid lines
    }
   ```

