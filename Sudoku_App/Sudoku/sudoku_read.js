//This program read the sample text file of the sudoku and stores in the respective data structure.
var fs = require("fs");
function read_file()
{
    fs.readFile('sample.txt', function (err, data) {
        if (err) {
           return console.error(err);
        }
        var a = data.toString().split('\n');
        var mat = [];

        for(let i = 0; i< a.length;i++)
        {
        
            var list = [];
            let c = 0;
            if(i != a.length -1)
            {
              c = 1;
            }
            
            for(let k = 0; k<a[i].length-c; k++)
            {
            
              if(a[i][k] == '.' || a[i][k] == 0)
              {
                  a[i][k] = 0;
                  list.push(0);
              }
              else
              {
                list.push(parseInt(a[i][k]));
              }
              
              
              
            }
            mat.push(list);
     
        }
        console.log(mat)
        return mat;
     });
}
read_file();