//Takes the sudoku and create a new array by locking the elements in the sudoku
export function sudoku_numbers(input : number[][])
{
    const myPromise = new Promise((resolve, reject) => {
    var a = input
    var b= [
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
    ];
    for(let i = 0; i<= 8;i++)
    {
        for(let j = 0; j<=8;j++)
        {
            if(a[i][j] == 0)
            {
             b[i][j] = '';
            }
            else
            {
                b[i][j] = a[i][j];
            }
        }
    }
    resolve(b);
   });
   return myPromise;
} 
export function sudoku_colors(input : String[][])
{
    var a = input
    var b= [
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
        ['red','red','red','red','red','red','red','red','red'],
    ];
    for(let i = 0; i<= 8;i++)
    {
        for(let j = 0; j<=8;j++)
        {
            if(a[i][j] == "")
            {
             b[i][j] = 'green'
            }
            else
            {
                b[i][j] = 'red'
            }
        }
    }
    return b;
} 
export function sudoku_backgroundcolors()
{
    
    var b= [
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
        ['white','white','white','white','white','white','white','white','white'],
    ];
    return b;
} 