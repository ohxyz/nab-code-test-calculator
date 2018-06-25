describe( 'CalculatorComponent' , function() {

    beforeEach( module( 'calculatorApp' ) );

    var $controller;
    var $scope;
        
    beforeEach( inject( function( $rootScope, $componentController ) {

        $scope = $rootScope.$new();
        $controller = $componentController( 'calculator', { $scope: $scope } );
        
    } ) );

    describe( 'Test onEqualClick event handler', function() {

        beforeEach( function() { 

            $controller.firstNumber = 1;
            $controller.secondNumber = 2;
            $controller.isOperatorPressed = true;
            $controller.stringToEvaluate = '1+2';

        } );

        it( 'should return 3 with default settings', function() {

            $scope.onEqualClick();
            expect( $scope.display ).toBe( 3 );
        } );

        it( 'should not change if no operator is pressed', function() {

            $controller.isOperatorPressed = false;
            
            var expected = 99;

            $scope.display = expected;
            $scope.onEqualClick();

            expect( $scope.display ).toBe( expected );

        } );

        it( 'should not change if no second number is not entered', function() {

            $controller.secondNumber = undefined;

            var expected = 99;

            $scope.display = expected;
            $scope.onEqualClick();

            expect( $scope.display ).toBe( expected );

        } );

    } );

    describe( 'Test onNumberClick event handler', function() {

        it( 'should throw an error when input is "-1"', function() {

            expect( function() { $scope.onNumberClick( '-1' ) } ).toThrow();

        } );

        it( 'should change the display to input digit when it displays 0', function() { 

            $controller.stringOfDigits = '0';
            $scope.onNumberClick( 1 );

            expect( $scope.display ).toBe( '1' );
        } );

        it ( 'should display a digit when input is a digit', function() {

            $scope.onNumberClick( 9 );
            expect( $scope.display ).toBe( '9' );

        } );

        it ( 'should diplay a sequence of digits when digit pads are pressed', function() { 

            $scope.onNumberClick( 1 );
            $scope.onNumberClick( 2 );
            $scope.onNumberClick( 3 );

            expect( $scope.display ).toBe( '123' );

        } );

        it ( 'should append a digit(pressed twice) at the end of eval string', function() { 

            $controller.firstNumber = 1;
            $controller.isOperatorPressed = true;
            $controller.stringToEvaluate = '1*';

            $scope.onNumberClick( 9 );
            $scope.onNumberClick( 9 );

            expect( $controller.stringToEvaluate ).toBe( '1*99' );

        } );
    } );

    describe( 'Test onOperatorClick event handler', function() {

        it( 'should throw an error if % is the operator', function() { 

            expect( function() { $scope.onOperatorClick(); } ).toThrow();

        } );

        it( 'should throw an error if firstNumber is not entered', function() {

            expect( function() { $scope.onOperatorClick( '+' ); } ).toThrow();

        } );

        it( 'should throw an error if one operator is already pressed', function() {

            $controller.firstNumber = 1;
            $scope.onOperatorClick( '+' );

            expect( function() { $scope.onOperatorClick( '*' ); } ).toThrow();

        } );

        it ( 'should append the operator to eval string when 1st number is there', function() {

            $scope.onNumberClick( 1 );
            $scope.onNumberClick( 2 );
            $scope.onOperatorClick( '/' );

            expect( $controller.stringToEvaluate ).toBe( '12/' );

        } );

    } );
} );