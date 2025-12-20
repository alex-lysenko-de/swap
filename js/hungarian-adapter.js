const HUNGARIAN_ON3 = 1;
const MUNKRES = 2;

function HungarianAdapter(algType = 2) {
    this.execute = function (profitMatrix) {
        if (!profitMatrix.length) {
            return [];
        }
        var lowCostMatrix = getInverted(profitMatrix);
        var results;
        switch (algType) {
            case HUNGARIAN_ON3: results = runHungarianOn3(lowCostMatrix);
            case MUNKRES: results =  runMunkres(lowCostMatrix);
        }
        console.log("Hungarian algorithm results:");
        console.log(results);
        return results;
    }

    function runHungarianOn3(matrix) {
        return hungarianOn3(matrix);
    }

    function runMunkres(matrix) {
        var munkres = new Munkres();
        var indices = munkres.compute(matrix);
        var results = matrix.map((row,i)=>[i,-1]);
        indices.forEach(pair => {
            var i = pair[0];
            var value = pair[1];
            results[i] = [i, value];
        });
        return results;
    }

    function getInverted(matrix) {
        // find the biggest value of the matrix
        var biggest = -Infinity;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] > biggest) {
                    biggest = matrix[i][j];
                }

            }
        }
        console.log('biggest value: ' + biggest);
        // var biggest = matrix.reduce((prevMax, row) => Math.max(prevMax, ...row), -Infinity);
        // clone and invert
        var clone = matrix.map(row => row.map(value => biggest - value));
        console.log('inverted matrix:');
        console.log(clone);

        return clone;
    }
}   