angular.module( 'calculator', [] );

angular
    .module( 'calculator' )
    .component( 'calculator', {

        templateUrl: './calculator/calculator.component.html',
        controller: [ '$scope', calculatorController ],

    } );

function calculatorController( $scope ) {

    var firstNumber;
    var secondNumber;
    var stringOfDigits;
    var stringToEvaluate;
    var isOperatorPressed;

    $scope.display = '0';
    
    init();

    function init() {

        firstNumber = undefined;
        secondNumber = undefined;
        stringOfDigits = '';
        stringToEvaluate = '';
        isOperatorPressed = false;
    }

    $scope.onDisplayClick = function() {

        if ( isNaN( firstNumber ) === true 
                || isNaN( secondNumber ) === true
                || isOperatorPressed === false 
                || stringToEvaluate === '' ) {

            return;
        }
        
        $scope.display = eval( stringToEvaluate );
        init();
    }

    $scope.onNumberClick = function( number ) {

        var regex = /^[0-9]|[.]$/;
        var numberLiteral = number.toString();

        if ( regex.test( numberLiteral ) === false ) {

            throw Error( '[Calculator] Should be a number or a dot(".").\n' );
        }

        if ( stringOfDigits === '0' && numberLiteral === '0' ) {

            return;
        }
        // NOTE: "dot" is allowed as first digit
        else if ( numberLiteral === '.' && stringOfDigits.indexOf( '.' ) >== 0 ) {

            return;
        }

        stringOfDigits += numberLiteral;
        stringToEvaluate += numberLiteral;

        if ( isOperatorPressed === false ) {

            firstNumber = parseFloat( stringOfDigits );
        }
        else {

            secondNumber = parseFloat( stringOfDigits );
        }

        $scope.display = stringOfDigits;
    }

    $scope.onOperatorClick = function ( operator ) {

        var validOperators = [ '+', '-', '*', '/' ];

        if ( validOperators.indexOf( operator ) === -1 ) {

            throw Error( '[Calculator] Operator is not valid.\n' );
        }

        if ( isNaN( firstNumber ) === true ) {

            throw Error( '[Calculator] The FIRST number is empty or not valid.\n' );
        }

        if ( isOperatorPressed === true ) {

            throw Error( '[Calculator] Only one of the operators is allowed.\n' );
        }

        isOperatorPressed = true;
        stringToEvaluate = stringOfDigits + operator;
        stringOfDigits = '';
    }

    $scope.onAllClearClick = function() {
        
        $scope.display = '0';
        init();
    }
}
