var assert = require('assert');
var lib = require('../src/standard-library');

var Collection = lib.Collection;
var Stack = lib.Stack; // ?? ну я могу конечно.
var FixedArray = lib.FixedArray;
var Queue = lib.Queue;
var Set = lib.Set;
var PriorityQueue = lib.PriorityQueue;

describe('Standard Library', function () {
    describe('Collection', function () {
        it('first', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.first, 'foo');
        });

        it('last', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.last, 'baz');
        });

        it('length', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.length, 3);
        });

        it('isEmpty', function () {
            var collection = new Collection();

            assert.ok(collection.isEmpty);

            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.ok(!collection.isEmpty);

        });

        it('pickFirst()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.pickFirst(), 'foo');
            assert.equal(collection.length, 2);

        });

        it('pickLast()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.pickLast(), 'baz');
            assert.equal(collection.length, 2);
        });

        it('insertFirst()', function () {
            var collection = new Collection();
            collection.insertFirst('foo');
            collection.insertFirst('bar');
            collection.insertFirst('baz');

            assert.equal(collection.first, 'baz');
            assert.equal(collection.last, 'foo');
        });

        it('insertLast()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');

            assert.equal(collection.first, 'foo');
            assert.equal(collection.last, 'baz');
        });

        it('empty()', function () {
            var collection = new Collection();
            collection.insertLast('foo');
            collection.insertLast('bar');
            collection.insertLast('baz');
            collection.empty();

            assert.ok(collection.isEmpty);
        });
    });

    describe('Queue', function () {
        it('enqueue(item)', function () {
            var queue = new Queue();

            assert.equal(queue.length, 0);

            queue.enqueue('foo');
            queue.enqueue('bar');
            queue.enqueue('baz');

            assert.equal(queue.length, 3);
        });

        it('dequeue()', function () {
            var queue = new Queue();
            queue.enqueue('foo');
            queue.enqueue('bar');
            queue.enqueue('baz');

            assert.equal(queue.dequeue(), 'foo');
            assert.equal(queue.dequeue(), 'bar');
            assert.equal(queue.dequeue(), 'baz');
        });
    });

    describe('FixedArray', function () {
        it('length', function () {
            var arr = new FixedArray(5);

            assert.equal(arr.length, 5);
        });

        it('insertAt(index, item)', function () {
            var arr = new FixedArray(2);

            assert.doesNotThrow(function () {
                arr.insertAt(0, 'foo');
                arr.insertAt(1, 'bar');
            });

            assert.throws(function () {
                arr.insertAt(2, 'baz');
            }, RangeError);
        });

        it('getAt(item)', function () {
            var arr = new FixedArray(2);
            arr.insertAt(0, 'foo');
            arr.insertAt(1, 'bar');

            assert.doesNotThrow(function () {
                arr.getAt(0);
                arr.getAt(1);
            });

            assert.throws(function () {
                arr.getAt(2);
            }, RangeError);
        });
    });

    describe('Set', function () {
        it('length / insert(item)', function () {
            var set = new Set();
            set.insert('foo');
            set.insert('bar');
            set.insert('foo');

            assert.equal(set.length, 2);
        });

        it('remove(item)', function () {
            var set = new Set();
            set.insert('foo');
            set.insert('bar');
            set.insert('foo');

            set.remove('foo');
            set.remove('bar');

            assert.equal(set.length, 0);
        });

        it('has(item)', function () {
            var set = new Set();
            set.insert('foo');
            set.insert('bar');

            set.remove('bar');

            assert.ok(set.has('foo'));
            assert.ok(!set.has('bar'));

        });

        it('intersect(set)', function () {
            var set1 = new Set();
            set1.insert('foo');
            set1.insert('bar');

            var set2 = new Set();
            set2.insert('bar');
            set2.insert('baz');

            var set3 = set1.intersect(set2);

            assert.equal(set1.length, 2);
            assert.equal(set2.length, 2);
            assert.equal(set3.length, 1);
            assert.ok(set3.has('bar'));
        });

        it('union(set)', function () {
            var set1 = new Set();
            set1.insert('foo');
            set1.insert('bar');

            var set2 = new Set();
            set2.insert('bar');
            set2.insert('baz');

            var set3 = set1.union(set2);

            assert.equal(set1.length, 2);
            assert.equal(set2.length, 2);
            assert.equal(set3.length, 3);
            assert.ok(set3.has('foo'));
            assert.ok(set3.has('bar'));
            assert.ok(set3.has('baz'));
        });
    });

    describe('Priority Queue', function () {
        it('should be empty after creation', function () {
            var pQueue = new PriorityQueue();
            assert.equal(pQueue.isEmpty, true);

        });

        it('shouldn\'t be empty after enqueue', function () {
            var pQueue = new PriorityQueue();
            pQueue.enqueue(1, 1);
            assert.equal(pQueue.isEmpty, false);
        });
        it('should be empty after enqueue/dequeue', function () {
            var pQueue = new PriorityQueue();
            pQueue.enqueue(1, 1);
            pQueue.dequeue();
            assert.equal(pQueue.isEmpty, true);
        });
        it('enqueue(item, priority)/length', function () {
            var pQueue = new PriorityQueue();
            var pairs = [
                ['a', 16],
                ['b', 9],
                ['c', 8],
                ['d', 6],
                ['e', 11],
                ['f', 5],
                ['g', 4],
                ['h', 10],
                ['i', 2],
                ['j', 1]
            ];
            pairs.forEach(item => pQueue.enqueue(...item));

            assert.equal(pQueue.length, 10);
        });

        it('dequeue', function () {
            var pQueue = new PriorityQueue();
            var pairs = [
                ['a', 16],
                ['b', 9],
                ['c', 8],
                ['d', 6],
                ['e', 11],
                ['f', 5],
                ['g', 4],
                ['h', 10],
                ['i', 2],
                ['j', 1]
            ];
            pairs.forEach(item => pQueue.enqueue(...item));
            var expected = ['a', 'e', 'h', 'b', 'c', 'd', 'f', 'g', 'i', 'j'];
            var actual = [];
            while (!pQueue.isEmpty) {
                actual.push(pQueue.dequeue());
            }
            assert.deepEqual(actual, expected);
        });
        it('heapSort', function () {
            var pairs = [
                [1, 16],
                [4, 9],
                [5, 8],
                [6, 6],
                [2, 11],
                [7, 5],
                [8, 4],
                [3, 10],
                [9, 2],
                [10, 1]
            ];
            var expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var actual = PriorityQueue.heapSort(pairs);
            assert.deepEqual(actual, expected);
        });
    });
});
