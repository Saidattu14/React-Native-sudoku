//This function stores the initial sudoku 
export function sudoku_restart(input)
{   
    var b= [
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
            b[i][j] = input[i][j]
        }
    }
    return b;
} 