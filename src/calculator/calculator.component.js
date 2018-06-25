angular.module( 'calculator', [] );

angular
    .module( 'calculator' )
    .component( 'calculator', {

        templateUrl: './calculator/calculator.component.html',
        controller: [ '$scope', CalculatorController ],

    } );

function CalculatorController( $scope ) {

    var self = this;

    self.firstNumber; // number | undefined
    self.secondNumber; // number | undefined
    self.stringOfDigits; // string 
    self.stringToEvaluate; // string
    self.isOperatorPressed; // boolean

    self.init = function () {

        self.firstNumber = undefined;
        self.secondNumber = undefined;
        self.stringOfDigits = '';
        self.stringToEvaluate = '';
        self.isOperatorPressed = false;
    }

    $scope.display = '0'; // string
    self.init();

    $scope.onEqualClick = function() {

        if ( isNaN( self.firstNumber ) === true 
                || isNaN( self.secondNumber ) === true
                || self.isOperatorPressed === false 
                || self.stringToEvaluate === '' ) {

            return;
        }
        
        $scope.display = eval( self.stringToEvaluate );
        self.init();
    }

    $scope.onNumberClick = function( number ) {

        var regex = /^[0-9]|[.]$/;
        var numberLiteral = number.toString();

        if ( regex.test( numberLiteral ) === false ) {

            throw Error( '[Calculator] Should be a number or a dot(".").\n' );
        }

        if ( self.stringOfDigits === '0' && numberLiteral === '0' ) {

            return;
        }
        // NOTE: "dot" is allowed as first digit
        else if ( numberLiteral === '.' && self.stringOfDigits.indexOf( '.' ) >= 0 ) {

            return;
        }

        if ( self.stringOfDigits === '0' && numberLiteral !== '0' ) {

            self.stringOfDigits = numberLiteral;
            self.stringToEvaluate = numberLiteral;
        }
        else {

            self.stringOfDigits += numberLiteral;
            self.stringToEvaluate += numberLiteral;
        }

        if ( self.isOperatorPressed === false ) {

            self.firstNumber = parseFloat( self.stringOfDigits );
        }
        else {

            self.secondNumber = parseFloat( self.stringOfDigits );
        }

        $scope.display = self.stringOfDigits;
    }

    $scope.onOperatorClick = function ( operator ) {

        var validOperators = [ '+', '-', '*', '/' ];

        if ( validOperators.indexOf( operator ) === -1 ) {

            throw Error( '[Calculator] Operator is not valid.\n' );
        }

        if ( isNaN( self.firstNumber ) === true ) {

            throw Error( '[Calculator] The FIRST number is empty or not valid.\n' );
        }

        if ( self.isOperatorPressed === true ) {

            throw Error( '[Calculator] One of the operators( +, -, *, / ) is already pressed.\n' );
        }

        self.isOperatorPressed = true;
        self.stringToEvaluate = self.stringOfDigits + operator;
        self.stringOfDigits = '';
    }

    $scope.onAllClearClick = function() {
        
        $scope.display = '0';
        self.init();
    }

}
