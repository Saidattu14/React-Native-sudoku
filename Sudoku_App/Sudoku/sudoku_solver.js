//Checks whether the sudoku is a valid or not by iterating through all the rows, columns and adjacent box.
//this function iterates each elements in the sudoku.
function isValid1(mat)
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
//This function takes the x and y coordinate data and look up possible numbers to fill in that x and y coordinates.
function sudoku_chk(mat,first,second)
{
  first = parseInt(first)
  var dict = {}
  for(let i = 0; i<=9; i++)
  {
    dict[i] = 1;
  }
  for(let i = 0; i<=8; i++)
  { 
      if(mat[first][i] != 0 && dict[mat[first][i]] != 0)
      {
        
        let a = mat[first][i];
        dict[a] = 0;
      }
      if(mat[second][i] != 0 && dict[mat[second][i]] != 0)
      {
        
        let a = mat[first][i];
        dict[a] = 0;
      }
  }
    let x = first%3;
    let y = second%3;
    if(x === 0 && y === 0)
    {
        
        dict[mat[first+1][second+1]] = 0;
        dict[mat[first+1][second+2]] = 0;
        dict[mat[first+2][second+1]] = 0;
        dict[mat[first+2][second+2]] = 0;
    }
    else if(x === 0 && y === 1)
    {
        dict[mat[first+1][second-1]] = 0;
        dict[mat[first+2][second-1]] = 0;
        dict[mat[first+1][second+1]] = 0;
        dict[mat[first+2][second+1]] = 0;
        
    }
    else if(x === 0 && y === 2)
    {
        dict[mat[first+1][second-2]] = 0;
        dict[mat[first+2][second-2]] = 0;
        dict[mat[first+1][second-1]] = 0;
        dict[mat[first+2][second-1]] = 0;
  
    }
    else if(x === 1 && y === 0)
    {
        dict[mat[first-1][second+1]] = 0;
        dict[mat[first-1][second+2]] = 0;
        dict[mat[first+1][second+1]] = 0;
        dict[mat[first+1][second+2]] = 0;
    }
    else if(x === 1 && y === 1)
    {
        dict[mat[first-1][second-1]] = 0;
        dict[mat[first-1][second+1]] = 0;
        dict[mat[first+1][second-1]] = 0;
        dict[mat[first+1][second+1]] = 0;
    }
    else if(x === 1 && y === 2)
    {
        dict[mat[first-1][second-1]] = 0;
        dict[mat[first-1][second-2]] = 0;
        dict[mat[first+1][second-1]] = 0;
        dict[mat[first+1][second-2]] = 0;
    }
    else if(x === 2 && y === 0)
    {
        dict[mat[first-1][second+1]] = 0;
        dict[mat[first-2][second+1]] = 0;
        dict[mat[first-1][second+2]] = 0;
        dict[mat[first-2][second+2]] = 0;

    }
    else if(x === 2 && y === 1)
    {
      dict[mat[first-1][second-1]] = 0;
      dict[mat[first-2][second-1]] = 0;
      dict[mat[first-1][second+1]] = 0;
      dict[mat[first-2][second+1]] = 0;
    }
    else if(x === 2 && y === 2)
    {
        dict[mat[first-1][second-2]] = 0;
        dict[mat[first-2][second-2]] = 0;
        dict[mat[first-1][second-1]] = 0;
        dict[mat[first-2][second-1]] = 0;
  
    }
    var arr = []
    for(let i = 1;i<=9;i++)
    {
      if(dict[i] == 1)
      {
        arr.push(i);
      }
    }
    return arr;
}
//This function check particular box elements with row and column elements.
//This function does not check for the entire sudoku.
function isValid(mat,first,second)
{
  for(var i = 0; i<=8; i++)
  { 
     if(mat[first][i] == mat[first][second] && i != second)
     {
      return 0;
     }
     if(mat[i][second] == mat[first][second] && i != first)
     {
      return 0;
     }
     
  }
    let x = first%3;
    let y = second%3;
    var a = mat[first][second];
    if(x === 0 && y === 0)
    {
    
        if(a == mat[first+1][second+1] || a == mat[first+1][second+2] || a == mat[first+2][second+1] || a == mat[first+2][second+2])
        {
          
            return 0;
        }
    }
    else if(x === 0 && y === 1)
    {
    
        if(a == mat[first+1][second-1] || a == mat[first+2][second-1] || a == mat[first+1][second+1] || a == mat[first+2][second+1])
        {
            
            return 0;
        }
    }
    else if(x === 0 && y === 2)
    {
        
        if(a == mat[first+1][second-2] || a == mat[first+2][second-2] || a == mat[first+1][second-1] || a == mat[first+2][second-1])
        {
            
            return 0;
        }
    }
    else if(x === 1 && y === 0)
    {
  
        if(a == mat[first-1][second+1] || a == mat[first-1][second+2] || a == mat[first+1][second+1] || a == mat[first+1][second+2])
        {
            
            return 0;
        }
    }
    else if(x === 1 && y === 1)
    {
        
        if(a == mat[first-1][second-1] || a == mat[first-1][second+1] || a == mat[first+1][second-1] || a == mat[first+1][second+1])
        {
            
            return 0;
        }
    }
    else if(x === 1 && y === 2)
    {
        
        if(a == mat[first-1][second-1] || a == mat[first-1][second-2] || a == mat[first+1][second-1] || a == mat[first+1][second-2])
        {
          
            return 0;
        }
    }
    else if(x === 2 && y === 0)
    {
     
        
        if(a == mat[first-1][second+1] || a == mat[first-2][second+1] || a == mat[first-1][second+2] || a == mat[first-2][second+2])
        {
          
            return 0;
        }
    }
    else if(x === 2 && y === 1)
    {       
        if(a == mat[first-1][second-1] || a == mat[first-2][second-1] || a == mat[first-1][second+1] || a == mat[first-2][second+1])
        {
            
            return 0;
        }
    }
    else if(x === 2 && y === 2)
    {
        
        if(a == mat[first-1][second-2] || a == mat[first-2][second-2] || a == mat[first-1][second-1] || a == mat[first-2][second-1])
        {
            
            return 0;
        }
    }
  return 1;
}
//This funtion takes the sudoku and identifies the large row to small rows to fill and stores the possible elements as a payload for the cell coordinates
function large_rows_columns(mat)
{
  var arr = []
  var dict = {}
  for(let i = 0; i<=8;i++)
  {
    let count = 0;
    for(let j = 0; j<= 8; j++)
    {
      if(mat[i][j] !== 0)
      {
        count = count + 1;
      }
    }
    dict[i] = count;
    
  }
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });
  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  var data = {}
  var list = [];
  for(let i = 0; i <= 8; i++) 
  {
    let a = items[i][0];
    var data = {}
    for(let j = 0; j <= 8; j++)
    {
      if(mat[a][j] === 0)
      {
        var val = sudoku_chk(mat,a,j)
        a = parseInt(a)
        let obj = {
          first : a,
          second : j,
          value : val,
          index : 0,
        }
        list.push(obj)
      }
    }
  }
  return list;
}
//Takes start time and end time to complete the sudoku and estimates the depth count of represents as the sudoku metrics.
function  level_classification(matrix,starttime,endtime)
{
  
   var time_complexity = (endtime-starttime)/1000;
   var depth_count = 0;
   var obj = {
     time_complexity : time_complexity,
     depth_count : 0,
     level : ''
   }
   for(let i = 0; i<=8;i++)
  {
    for(let j = 0; j<=8;j++)
    {
     depth_count = matrix[i][j] + depth_count;
    }
  }
  
  obj.depth_count = depth_count;
  if(depth_count >=  0 && depth_count < 6000)
  {
     obj.level = "Easy";
  }
  else if(depth_count >= 6000 && depth_count < 15000)
  {
    obj.level = "Medium";
  }
  else if(depth_count >= 15000 && depth_count < 30000)
  {
    obj.level = "Hard";
  }
  else if(depth_count >= 30000)
  {
    obj.level = "Samurai";
  }
  return obj;
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


//Takes to sudoku and divde the sudoku into a list of elements to fill.
//The list list elements has the payload with possible values of the elements to fill.
//Iterates through the list and with possible pay load elements and stores the last index.
//If there is no possible sudoku with payload values it back tracks with loop decrement and start at last index.
//Thus it iterates through all the list elements to fill.
var solver = function sudoku_solver(input) {
var mat =  [
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
var matrix= [
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
 
  for(let i = 0; i<= 8;i++)
    {
        for(let j = 0; j<=8;j++)
        {
            if(input[i][j] == " ")
            {
             mat[i][j] = 0;
            }
            else
            {
              mat[i][j] = input[i][j]
            }
        }
    }
  
  var list = []
  list = large_rows_columns(mat);
  var starttime=(new Date()).getTime();
  // var starttime=(new Date()).getTime();
  for(var i = 0; i<list.length;i++)
  {
    try {
    var obj = list[i];
    var count = 0;
    for(var j = obj.index; j < obj.value.length;j++)
    {
      matrix[obj.first][obj.second] = matrix[obj.first][obj.second] + 1;
      mat[obj.first][obj.second] = obj.value[j];
      list[i].index = j;
      var res = isValid(mat,obj.first,obj.second);
      if(res == 1)
      {
        
        count = 1;
        break;
      }
    }
    if(count == 1)
    {
      
      list[i].index = list[i].index + 1;
    }
    if(count == 0)
    {
      mat[obj.first][obj.second] = 0
      list[i].index = 0;
      i = i - 2;
    }
    } catch (error) {
      console.log("Error in the Sudoku")
      break;
    }
  }
var endtime = (new Date()).getTime();
var sudoku_metrics = level_classification(matrix,starttime,endtime);
let obj1 = {
  result : mat,
  sudoku_metrics : sudoku_metrics
}
// console.log(isValid1(mat))
return obj1;
}
module.exports = solver; U
