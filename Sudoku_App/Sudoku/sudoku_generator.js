var file = require('./sudoku_solver')


//Identifies whether the sudoku is valid or not.
function isValid(mat)
{
    
    for(let i = 0; i<=8; i++)
    {
        for(let k = 0; k<=8; k++)
        {
            if(mat[i][k] >= 0 || mat[i][k] <= 9 )
            {
                
            }
            else
            {
                mat[i][k] = 0;
            }
        }
    }
    for(let i = 0; i<=8; i++)
    {
    
        let dict1 = {}
        let dict2 = {}
        for(let k = 0; k<=8; k++)
        {
            dict1[k+1] = 1;
            dict2[k+1] = 1;
        }
        for(let j = 0; j<=8;j++)
        {
            
            if(dict1[mat[i][j]] == 1 && mat[i][j] !== 0)
            {
                dict1[mat[i][j]] = 0;
            }
            else if(mat[i][j] !== 0)
            {
                
                return 0;
            }
        }
        for(let l = 0; l<=8;l++)
        {
            
            if(dict2[mat[l][i]] == 1 && mat[l][i] !== 0)
            {
                dict2[mat[l][i]] = 0;
            }
            else if(mat[l][i] !== 0)
            {
                
                return 0;
            }   
        }
    }
    for(let i = 0; i<=8; i++)
    {
        for(let k = 0; k<=8; k++)
        {
            if(mat[i][k] != 0)
            {
            let x = i%3;
            let y = k%3;
            if(x === 0 && y === 0)
            {
                let a = mat[i][k]
                if(a === mat[i+1][k+1] || a == mat[i+1][k+2] || a == mat[i+2][k+1] || a == mat[i+2][k+2])
                {
                    
                    return 0;
                }
            }
            else if(x === 0 && y === 1)
            {
                let a = mat[i][k]
                if(a == mat[i+1][k-1] || a == mat[i+2][k-1] || a == mat[i+1][k+1] || a == mat[i+2][k+1])
                {
                     
                    return 0;
                }
            }
            else if(x === 0 && y === 2)
            {
                let a = mat[i][k]
                if(a == mat[i+1][k-2] || a == mat[i+2][k-2] || a == mat[i+1][k-1] || a == mat[i+2][k-1])
                {
                    
                    return 0;
                }
            }
            else if(x === 1 && y === 0)
            {
                let a = mat[i][k]
                if(a == mat[i-1][k+1] || a == mat[i-1][k+2] || a == mat[i+1][k+1] || a == mat[i+1][k+2])
                {
                    
                    return 0;
                }
            }
            else if(x === 1 && y === 1)
            {
                let a = mat[i][k]
                if(a == mat[i-1][k-1] || a == mat[i-1][k+1] || a == mat[i+1][k-1] || a == mat[i+1][k+1])
                {
                
                    return 0;
                }
            }
            else if(x === 1 && y === 2)
            {
                let a = mat[i][k]
                if(a == mat[i-1][k-1] || a == mat[i-1][k-2] || a == mat[i+1][k-1] || a == mat[i+1][k-2])
                {
                    
                    return 0;
                }
            }
            else if(x === 2 && y === 0)
            {
                let a = mat[i][k]
                if(a == mat[i-1][k+1] || a == mat[i-2][k+1] || a == mat[i-1][k+2] || a == mat[i-2][k+2])
                {
                    
                    return 0;
                }
            }
            else if(x === 2 && y === 1)
            {
                let a = mat[i][k]
                if(a == mat[i-1][k-1] || a == mat[i-2][k-1] || a == mat[i-1][k+1] || a == mat[i-2][k+1])
                {
                    
                    return 0;
                }
            }
            else if(x === 2 && y === 2)
            {
                let a = mat[i][k]
                if(a == mat[i-1][k-2] || a == mat[i-2][k-2] || a == mat[i-1][k-1] || a == mat[i-2][k-1])
                {
                
                    return 0;
                }
            }
            }
        }
    }    
return 1;    
}



//Randomly assigns the element with the range between min and max
const random = (min = 0, max = 50) => {
    let num = Math.random() * (max - min) + min;
    return Math.round(num);
}
function print(mat)
{
  for(var i = 0; i<=8;i++)
  {
      var a = '';
    for(var j = 0; j<=8;j++)
    {
     a = a + mat[i][j] + " ";
    }
    console.log(a)
  }
}


//Swapes the first value with second values in the entire sudoku and return the sudoku.

function swaping(first,second,mat)
{
   var k = 0;
   var l = 0;
     while(k <= 8)
     {
        while(l <= 8)
        {
        var obj = [];
        for(let i = k; i<=k+2;i++)
        {
            
            for(let j = l; j<=l+2;j++)
            {
                if(mat[i][j] == first)
                {
                  let val = {
                      x : i,
                      y : j,
                  }
                  obj.push(val);
                }
                if(mat[i][j] == second)
                {
                  let val = {
                      x : i,
                      y : j,
                  }
                  obj.push(val);
                }  
            }
            
        }
        var a = mat[obj[0].x][obj[0].y];
        var b = mat[obj[1].x][obj[1].y];
        mat[obj[0].x][obj[0].y] = b;
        mat[obj[1].x][obj[1].y] = a;
        l = l + 3;
        }
        k = k + 3;
        l = 0;
    }
   return mat;
}
//Iterates through the list of the elements and calls the swaping function to swap.

function generator(mat,list)
{

    for(let i = 0; i<list.length-1; i++)
    {
        var obj1 = list[i];
        var obj2 = list[i+1];
        var first = mat[obj1.first][obj1.second];
        var second = mat[obj2.first][obj2.second];
        if(first != second)
        {
        mat = swaping(first,second,mat)
        }
    }
    return mat;
}
//This function takes the three unique elements in the first three rows of the three elements
//It randoms chooses one element in list and look up all the elements of the element value in the sudoku
//It randomly assigns the zero value to the elements and inputs to the sudoku solver for metrics of the sudoku
//It iterates up to first three rows and returns the sudoku with metrics.

function placing_values(list,mat,dict)
{
    var number;
    if(list.length == 3)
    {
        number = random(0,2);
       
    }
    else if(list.length == 2)
    {
       number = random(0,1);

    }
    else
    {
        number = 0;
    }
    
    for(let i = 0;i<list.length-1;i++)
    {
        if( i != number )
        {
          let obj = list[i];
          mat[obj.x][obj.y] = 0;
        }
    }
    var obj = list[number];
    dict[obj.value] = 0;
    var new_list = [];
    for(let i = 0; i<=8;i++)
    {
        for(let j = 0; j<=8;j++)
        {
            if(obj.value == mat[i][j] )
            {
              let obj1 = {
                x : i,
                y : j,
                x1 : i%3,
                y1 : j%3,
                value : mat[i][j]
              }
              new_list.push(obj1);
             
            }
            else if(obj.value == mat[i][j])
            {
                mat[i][j] = 0;
            }
        
        }
    }
   var o = random(1,4)
   var count = new_list.length - o;
   while(true)
    {
        let rnd = random(0,new_list.length -1);
        let obj1 = new_list[rnd]
        if(mat[obj1.x][obj1.y] != 0)
        {
            mat[obj1.x][obj1.y] = 0;
            count = count - 1;
        }
        if(count == 0)
        {
            break;
        }
    }
    var file_result = file(mat);
    var new_obj = {
        matrix : mat,
        metrics : file_result.sudoku_metrics,
    }
    return new_obj;
}


//This function takes the swaped sudoku and utilises the first three rows.
//For every three elemnts in first three rows it creates a list and calls placing_values function.
//The return of the placing_values function is key pair sudoku with metrics
// It iterates through the first three rows and stores array of key pair sudokus with metrics.
//It returns to the array to medium_hard_samurai level function.

function symmetry(mat)
{
    dict = {}
    for(let i = 1; i<=9;i++)
    {
      dict[i] = 1;
    }
    var new_list = [];
    for(let i = 0; i<=2;i++)
    {
        var list = []
        for(let j = 0;j<=8;j++)
        {

           var obj = {
               x : i,
               y : j,
               x1 : i%3,
               y1 : j%3,
               value : mat[i][j]
           }
           if(dict[mat[i][j]] != 0 && mat[i][j] != 0)
           {
           list.push(obj);
           }
           if(j%3 == 2)
           {
               
               if(list.length != 0)
               {
                var res = placing_values(list,mat,dict);
                new_list.push(res);
                list = [];
               }
            
           }
        }


    }
    return new_list;

}

//The function swapes the elements and skips the random elements and give back to the application
function easy_level(input,list,count)
{

   var a = generator(input,list);
    while(true)
    {
        var x = random(0,8)
        var y = random(0,8)
        if(a[x][y] != 0)
        {
            a[x][y] = 0;
            count = count - 1;
        }
        if(count == 0)
        {
            break;
        }
    }
    return a;
}

//This function takes the list of elements to be swaped and inputs to symmetry to achieve the user input level.
function medium_hard_samurai_level(input,list,level)
{
  var a = generator(input,list); //Generates the swaped elements sudoku
  var data = symmetry(a);  //inputs to the symmetry and recieves the key pair sudoku with metrics.
  for(let i = 0; i<data.length;i++)
  {
    if(data[i].metrics.level == level)
    {
        
        return data[i]; // returns if the user input matches with key pair sudoku elements.
    }
  }
  return 1;
}

//Fills the zero values in the sudoku with blanks and retuns the sudoku
function filling_blanks(res)
{
    for(let i = 0; i<= 8;i++)
    {
        for(let j = 0; j<=8;j++)
        {
            if(res[i][j] == 0)
            {
             res[i][j] = " ";
            }
        }
    }
    return res;
}




//This function takes the user input of level which is either 'Easy','Medium','Hard','Samurai'.
export function sudoku_shuffling(level)
{
   var res;
   //Until the user input interface it iterates 
    console.log(level)
   while(true)
   {
    var input = [
        [1, 3, 7, 8, 9, 6, 2, 4, 5],
        [5, 8, 4, 7, 3, 2, 6, 1, 9],
        [2, 6, 9, 1, 4,5, 8, 7, 3],
        [3, 7, 8, 2, 6,9, 4, 5, 1],
        [4, 1, 6, 5, 7,3, 9, 2, 8],
        [9, 5, 2, 4, 8,1, 3, 6, 7],
        [6, 4, 3, 9, 5,7, 1, 8, 2],
        [8, 2, 5, 3, 1,4, 7, 9, 6],
        [7, 9, 1, 6, 2,8, 5, 3, 4]
      ]
    var mat = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
    var matrix = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
    var count = random(30,35); // assigns a random number to swap the elements in the sudoku
    if(count%2 == 1)
    {
        count = count + 1;
    }
    var list = []
    while(true)  // stores the random numbers row,column and value list to swap
    {
        var x = random(0,8)
        var y = random(0,8)
        if(mat[x][y] == 0)
        {
            mat[x][y] = "X";
            count = count - 1;
            let obj = {
                first : x,
                second : y,
            }
            list.push(obj)
        }
        if(count == 0)
        {
            break;
        }
    }
    
    if(level == "Easy")
    {
        count = 48;
        res = easy_level(input,list,count); //Calls the easy level function 
        let result  = filling_blanks(res); //fills the zero values with blanks
        return result;  // returns the sudoku
        
    }
    else if(level == "Medium")
    {
    
        res = medium_hard_samurai_level(input,list,level); 
    }
    else if(level == "Hard")
    {
        res = medium_hard_samurai_level(input,list,level);
    }
    else if(level == "Samurai")
    {
        res = medium_hard_samurai_level(input,list,level);
    }
    
    if((level == "Medium" || level == "Hard" || level == "Samurai") && res != 1) 
    {
      
      for(let i = 0; i<=8;i++ )
      {
          for(let j =0;j<=8;j++)
          {
            matrix[i][j] = res.matrix[i][j]
          }
      }
      matrix = filling_blanks(matrix);
      return matrix;
    }
    else
    {
        res = null;
    }
   }
}




