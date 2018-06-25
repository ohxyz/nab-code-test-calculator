angular
    .module( 'calculatorApp', [ 'calculator' ] )
    .directive( 'ngClick', function() {

        return {

            restrict: 'A',
            priority: 0,
            link: function( scope, element, attr ) {

                element.bind( 'click', function() {

                    var errorContainer = document.getElementById( 'error' );

                    if ( errorContainer.innerText !== '' ) {

                        errorContainer.innerText = '';
                    }
                } );
            }
        }
    } )
    .config( function ( $provide ) {

        $provide.decorator( '$exceptionHandler', function () {

            return function ( exception ) {

                document.getElementById( 'error' ).innerText = exception.message;
            };
        } );
    } );