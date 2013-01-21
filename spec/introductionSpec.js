// to work with Node:
var BDD = BDD || {};
if (typeof(require) != 'undefined'){
   BDD = require('../introduction').BDD;
   BDD.Dog = require('../introCoffee').BDD.Dog;
   var window = global;
}

describe("the tricky yet powerful parts of JavaScript", function(){

	describe("object definitions", function(){
		it("can be an object literal", function(){
			var literal = {name: 'John', surname: 'Connor'};

			expect(literal.name).toBe('John');
		});

		it("can be a constructor with methods inside", function(){
			var cat = new BDD.Cat();

			expect(cat.isPurring()).toBeTruthy();
		});		

		it("can have the methods in the prototype", function(){
			var balance = 20;
			var account = new BDD.Account(balance);

			expect(account.balance()).toBe(balance);
		});				

		it("can iterate over objet properties", function(){
			var literal = {name: 'John', age: 28};
			var propertyNames = [];
			for(var propName in literal)
				propertyNames.push(propName);

			expect(propertyNames.length).toBe(2);
		});

		it("can iterate over an array, which is different way of iteration", function(){
			var sequence = [1,3,5,7];
			var sum = 0;
			for (var i = 0, len = sequence.length; i < len; i++)
				sum += sequence[i];

			expect(sum).toBe(16);
		});
	});

	describe("scopes and closures", function(){
		it("can nest functions to create closures", function(){
			function closure(){
				var somePrivateVar = 5;

				var nested = function(){
					return {
						theValue: somePrivateVar
					};
				};
				return nested;
			}

			var nested = closure();
			expect(nested().theValue).toBe(5);
		});

		it("doesnt have a private scope inside blocks", function(){
			var j = 0;
			for (var i = 0; i < 5; i++) {
				j += i;
			};

			expect(i).toBe(5);
			expect(j).toBe(10);
		});

		it("hoists variables the way you probably dont expect", function(){
			function generate(){
				var functions = [];
				for (var i = 0; i < 5; i++){
					functions.push(function(){
						return i;
					});
				}
				return functions;
			}

			expect(generate()[0]()).toBe(5);
			expect(generate()[1]()).toBe(5);
			expect(generate()[2]()).toBe(5);
		});
	});

	describe("the THIS keyword", function(){
		var cat;

		beforeEach(function(){
			cat = new BDD.Cat();
			window.kilos = 0;
		});

		it("works as expected in other languages", function(){
			cat.feed();
			cat.feed();

			expect(cat.kilos).toBe(3);
		});

		it("works different on dettached functions", function(){
			window.kilos = 10;
			var feed = cat.feed;

			feed();

			expect(window.kilos).toBe(11);
			expect(cat.kilos).toBe(1);
		});		

		it("can be bound explicitly with CALL and APPLY", function(){
			var feed = cat.feed;

			feed.call(cat);

			expect(cat.kilos).toBe(2);	
		});		

		it("can be bound in modern browsers with BIND", function(){
			var feed = cat.feed;
			var bound = feed.bind(cat);

			bound();

			expect(cat.kilos).toBe(2);
		});		

		it("works different when function is attached to other object", function(){
			var dog = new BDD.Dog();
			dog.kilos = 10;
			dog.feed = cat.feed;

			dog.feed();
			expect(dog.kilos).toBe(11);
			expect(cat.kilos).toBe(1);
		});				

		it("can be handled using the SELF trick", function(){
			var energy = 200;
			var lion = new BDD.Lion(energy);

			lion.hunt();

			expect(lion.energy).toBeLessThan(energy);
		});				

		it("interprest the THIS when the function is executed", function(){
			var energy = 200;
			var lion = new BDD.Lion();

			lion.hunt = function(){
				this.energy = 4000;
			};
			lion.hunt();

			expect(lion.energy).toBe(4000);
		});						
	});

	describe("event driven development", function(){
		it("can use the DOM traditional way of event handling", function(){
			var lion = new BDD.Lion();
			var eventWasFired = false
			lion.onHunting = function(){
				eventWasFired = true;
			};

			lion.hunt();

			expect(eventWasFired).toBeTruthy();
		});

		it("can use the observer pattern", function(){
			var eventBus = new BDD.EventBus();
			var eventWasFired = false;
			var handler = function(eventName, eventArgs){
				eventWasFired = true;
				expect(eventArgs.someNumber).toBe(10);
			}
			eventBus.addSubscriber(handler, "someEvent");

			eventBus.emit("someEvent", {someNumber: 10});

			expect(eventWasFired).toBeTruthy();
		});

		it('might use events to orchestrate collaboration but the test doesnt know', function(){
			var stub = { onSomeEvent: function(){

			}};
			var spy = { called: false, callMe: function(){ this.called = true}};
			var Sut = function(collaborator1, collaborator2){
				collaborator1.onSomeEvent = function(){
					collaborator2.callMe();	
				};
			};
			var sut = new Sut(stub, spy);

			stub.onSomeEvent();

			expect(spy.called).toBeTruthy();
		});
	});
});

describe("the test doubles", function(){
	var lion;
	beforeEach(function(){
		lion = new BDD.Lion();
	});

	it("spies on methods", function(){
		spyOn(lion, "onHunting");

		lion.hunt();

		expect(lion.onHunting).toHaveBeenCalled();
	});

	it("stubs out a method", function(){
		var energy = 100
		var friend = new BDD.Lion(energy);
		friend.isPurring = function(){ // stub
			return true;
		};

		lion.playWithFriend(friend);

		expect(lion.energy).toBeGreaterThan(energy);
	});
});

describe("the jQuery API", function(){

});
