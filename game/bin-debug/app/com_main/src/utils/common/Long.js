// class Long {
//         public low: number;
//         public high: number;
//         public unsigned: boolean;
//         private __isLong__: any = {
//             value: true,
//             enumerable: false,
//             configurable: false
//         };
//         private static INT_CACHE = {};
//         private static UINT_CACHE = {};
//         /**
//          * @type {number}
//          * @const
//          * @inner
//          */
//         private static TWO_PWR_16_DBL = 1 << 16;
//         /**
//          * @type {number}
//          * @const
//          * @inner
//          */
//         private static TWO_PWR_24_DBL = 1 << 24;
//         /**
//          * @type {number}
//          * @const
//          * @inner
//          */
//         private static TWO_PWR_32_DBL = Long.TWO_PWR_16_DBL * Long.TWO_PWR_16_DBL;
//         /**
//          * @type {number}
//          * @const
//          * @inner
//          */
//         private static TWO_PWR_64_DBL = Long.TWO_PWR_32_DBL * Long.TWO_PWR_32_DBL;
//         /**
//          * @type {number}
//          * @const
//          * @inner
//          */
//         private static TWO_PWR_63_DBL = Long.TWO_PWR_64_DBL / 2;
//         /**
//          * @type {!Long}
//          * @const
//          * @inner
//          */
//         private static TWO_PWR_24 = Long.fromInt(Long.TWO_PWR_24_DBL);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static ZERO = Long.fromInt(0);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static UZERO = Long.fromInt(0, true);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static ONE = Long.fromInt(1);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static UONE = Long.fromInt(1, true);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static NEG_ONE = Long.fromInt(-1);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static MAX_VALUE = Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static MAX_UNSIGNED_VALUE = Long.fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
//         /**
//          * @type {!Long}
//          * @inner
//          */
//         private static MIN_VALUE = Long.fromBits(0, 0x80000000 | 0, false);
//         private static pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)
//         public constructor(low?: number, high?: number, unsigned?: boolean) {
//             this.low = low | 0;
//             this.high = high | 0;
//             this.unsigned = !!unsigned;
//         }
//         public isLong(obj) {
//             return (obj && obj["__isLong__"]) === true;
//         }
//         /**
//          * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
//          * @returns {number}
//          */
//         public toInt() {
//             return this.unsigned ? this.low >>> 0 : this.low;
//         }
//         /**
//          * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
//          * @returns {number}
//          */
//         public toNumber(): number {
//             if (this.unsigned)
//                 return ((this.high >>> 0) * Long.TWO_PWR_32_DBL) + (this.low >>> 0);
//             return this.high * Long.TWO_PWR_32_DBL + (this.low >>> 0);
//         }
//         /**
//         * Converts the Long to a string written in the specified radix.
//         * @param {number=} radix Radix (2-36), defaults to 10
//         * @returns {string}
//         * @override
//         * @throws {RangeError} If `radix` is out of range
//         */
//         public toString(radix: any): string {
//             radix = radix || 10;
//             if (radix < 2 || 36 < radix)
//                 throw RangeError('radix');
//             if (this.isZero())
//                 return '0';
//             if (this.isNegative()) { // Unsigned Longs are never negative
//                 if (this.eq(Long.MIN_VALUE)) {
//                     // We need to change the Long value before it can be negated, so we remove
//                     // the bottom-most digit in this base and then recurse to do the rest.
//                     var radixLong = Long.fromNumber(radix),
//                         div = this.div(radixLong),
//                         rem1 = div.mul(radixLong).sub(this);
//                     return div.toString(radix) + rem1.toInt().toString(radix);
//                 } else
//                     return '-' + this.neg().toString(radix);
//             }
//             // Do several (6) digits each time through the loop, so as to
//             // minimize the calls to the very expensive emulated div.
//             var radixToPower = Long.fromNumber(Long.pow_dbl(radix, 6), this.unsigned),
//                 rem = this;
//             var result = '';
//             while (true) {
//                 var remDiv = rem.div(radixToPower),
//                     intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
//                     digits = intval.toString(radix);
//                 rem = remDiv;
//                 if (rem.isZero())
//                     return digits + result;
//                 else {
//                     while (digits.length < 6)
//                         digits = '0' + digits;
//                     result = '' + digits + result;
//                 }
//             }
//         }
//         public get highBitsUnsigned() {
//             return this.high >>> 0;
//         }
//         public get lowBitsUnsigned() {
//             return this.low >>> 0;
//         }
//         /**
//          * Gets the number of bits needed to represent the absolute value of this Long.
//          * @returns {number}
//          */
//         public getNumBitsAbs() {
//             if (this.isNegative()) // Unsigned Longs are never negative
//                 return this.eq(Long.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
//             var val = this.high != 0 ? this.high : this.low;
//             for (var bit = 31; bit > 0; bit--)
//                 if ((val & (1 << bit)) != 0)
//                     break;
//             return this.high != 0 ? bit + 33 : bit + 1;
//         }
//         public isZero(): boolean {
//             return this.high === 0 && this.low === 0;
//         }
//         public isNegative(): boolean {
//             return !this.unsigned && this.high < 0;
//         }
//         public isPositive(): boolean {
//             return this.unsigned || this.high >= 0;
//         }
//         public isOdd(): boolean {
//             return (this.low & 1) === 1;
//         }
//         public isEven(): boolean {
//             return (this.low & 1) === 0;
//         }
//         /**
//          * Tests if this Long's value equals the specified's.
//          * @param {!Long|number|string} other Other value
//          * @returns {boolean}
//          */
//         public eq(other): boolean {
//             if (!this.isLong(other))
//                 other = Long.fromValue(other);
//             if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
//                 return false;
//             return this.high === other.high && this.low === other.low;
//         }
//         /**
//          * Tests if this Long's value differs from the specified's.
//          * @param {!Long|number|string} other Other value
//          * @returns {boolean}
//          */
//         public neq(other): boolean {
//             return !this.eq(/* validates */ other);
//         }
//         /**
//          * Tests if this Long's value is less than the specified's.
//          * @param {!Long|number|string} other Other value
//          * @returns {boolean}
//          */
//         public lt(other): boolean {
//             return this.compare(/* validates */ other) < 0;
//         }
//         /**
//          * Tests if this Long's value is less than or equal the specified's.
//          * @param {!Long|number|string} other Other value
//          * @returns {boolean}
//          */
//         public lte(other): boolean {
//             return this.compare(/* validates */ other) <= 0;
//         }
//         /**
//          * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
//          * @function
//          * @param {!Long|number|string} other Other value
//          * @returns {boolean}
//          */
//         public gt(other): boolean {
//             return this.compare(/* validates */ other) > 0;
//         }
//         /**
//          * Tests if this Long's value is greater than or equal the specified's.
//          * @param {!Long|number|string} other Other value
//          * @returns {boolean}
//          */
//         public gte(other): boolean {
//             return this.compare(/* validates */ other) >= 0;
//         }
//         /**
//          * Compares this Long's value with the specified's.
//          * @param {!Long|number|string} other Other value
//          * @returns {number} 0 if they are the same, 1 if the this is greater and -1
//          *  if the given one is greater
//          */
//         public compare(other) {
//             if (!this.isLong(other))
//                 other = Long.fromValue(other);
//             if (this.eq(other))
//                 return 0;
//             var thisNeg = this.isNegative(),
//                 otherNeg = other.isNegative();
//             if (thisNeg && !otherNeg)
//                 return -1;
//             if (!thisNeg && otherNeg)
//                 return 1;
//             // At this point the sign bits are the same
//             if (!this.unsigned)
//                 return this.sub(other).isNegative() ? -1 : 1;
//             // Both are positive if at least one is unsigned
//             return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
//         }
//         /**
//          * Negates this Long's value.
//          * @returns {!Long} Negated Long
//          */
//         public neg() {
//             if (!this.unsigned && this.eq(Long.MIN_VALUE))
//                 return Long.MIN_VALUE;
//             return this.not().add(Long.ONE);
//         }
//         /**
//          * Returns the sum of this and the specified Long.
//          * @param {!Long|number|string} addend Addend
//          * @returns {!Long} Sum
//          */
//         public add(addend): Long {
//             if (!this.isLong(addend))
//                 addend = Long.fromValue(addend);
//             // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
//             var a48 = this.high >>> 16;
//             var a32 = this.high & 0xFFFF;
//             var a16 = this.low >>> 16;
//             var a00 = this.low & 0xFFFF;
//             var b48 = addend.high >>> 16;
//             var b32 = addend.high & 0xFFFF;
//             var b16 = addend.low >>> 16;
//             var b00 = addend.low & 0xFFFF;
//             var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
//             c00 += a00 + b00;
//             c16 += c00 >>> 16;
//             c00 &= 0xFFFF;
//             c16 += a16 + b16;
//             c32 += c16 >>> 16;
//             c16 &= 0xFFFF;
//             c32 += a32 + b32;
//             c48 += c32 >>> 16;
//             c32 &= 0xFFFF;
//             c48 += a48 + b48;
//             c48 &= 0xFFFF;
//             return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
//         }
//         /**
//          * Returns the difference of this and the specified Long.
//          * @param {!Long|number|string} subtrahend Subtrahend
//          * @returns {!Long} Difference
//          */
//         public sub(subtrahend): Long {
//             if (!this.isLong(subtrahend))
//                 subtrahend = Long.fromValue(subtrahend);
//             return this.add(subtrahend.neg());
//         }
//         /**
//          * Returns the product of this and the specified Long.
//          * @param {!Long|number|string} multiplier Multiplier
//          * @returns {!Long} Product
//          */
//         public mul(multiplier): Long {
//             if (this.isZero())
//                 return Long.ZERO;
//             if (!this.isLong(multiplier))
//                 multiplier = Long.fromValue(multiplier);
//             if (multiplier.isZero())
//                 return Long.ZERO;
//             if (this.eq(Long.MIN_VALUE))
//                 return multiplier.isOdd() ? Long.MIN_VALUE : Long.ZERO;
//             if (multiplier.eq(Long.MIN_VALUE))
//                 return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;
//             if (this.isNegative()) {
//                 if (multiplier.isNegative())
//                     return this.neg().mul(multiplier.neg());
//                 else
//                     return this.neg().mul(multiplier).neg();
//             } else if (multiplier.isNegative())
//                 return this.mul(multiplier.neg()).neg();
//             // If both longs are small, use float multiplication
//             if (this.lt(Long.TWO_PWR_24) && multiplier.lt(Long.TWO_PWR_24))
//                 return Long.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
//             // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
//             // We can skip products that would overflow.
//             var a48 = this.high >>> 16;
//             var a32 = this.high & 0xFFFF;
//             var a16 = this.low >>> 16;
//             var a00 = this.low & 0xFFFF;
//             var b48 = multiplier.high >>> 16;
//             var b32 = multiplier.high & 0xFFFF;
//             var b16 = multiplier.low >>> 16;
//             var b00 = multiplier.low & 0xFFFF;
//             var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
//             c00 += a00 * b00;
//             c16 += c00 >>> 16;
//             c00 &= 0xFFFF;
//             c16 += a16 * b00;
//             c32 += c16 >>> 16;
//             c16 &= 0xFFFF;
//             c16 += a00 * b16;
//             c32 += c16 >>> 16;
//             c16 &= 0xFFFF;
//             c32 += a32 * b00;
//             c48 += c32 >>> 16;
//             c32 &= 0xFFFF;
//             c32 += a16 * b16;
//             c48 += c32 >>> 16;
//             c32 &= 0xFFFF;
//             c32 += a00 * b32;
//             c48 += c32 >>> 16;
//             c32 &= 0xFFFF;
//             c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
//             c48 &= 0xFFFF;
//             return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
//         };
//         /**
//          * Returns this Long divided by the specified. The result is signed if this Long is signed or
//          *  unsigned if this Long is unsigned.
//          * @param {!Long|number|string} divisor Divisor
//          * @returns {!Long} Quotient
//          */
//         public div(divisor) {
//             if (!this.isLong(divisor))
//                 divisor = Long.fromValue(divisor);
//             if (divisor.isZero())
//                 throw Error('division by zero');
//             if (this.isZero())
//                 return this.unsigned ? Long.UZERO : Long.ZERO;
//             var approx, rem, res;
//             if (!this.unsigned) {
//                 // This section is only relevant for signed longs and is derived from the
//                 // closure library as a whole.
//                 if (this.eq(Long.MIN_VALUE)) {
//                     if (divisor.eq(Long.ONE) || divisor.eq(Long.NEG_ONE))
//                         return Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
//                     else if (divisor.eq(Long.MIN_VALUE))
//                         return Long.ONE;
//                     else {
//                         // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
//                         var halfThis = this.shr(1);
//                         approx = halfThis.div(divisor).shl(1);
//                         if (approx.eq(Long.ZERO)) {
//                             return divisor.isNegative() ? Long.ONE : Long.NEG_ONE;
//                         } else {
//                             rem = this.sub(divisor.mul(approx));
//                             res = approx.add(rem.div(divisor));
//                             return res;
//                         }
//                     }
//                 } else if (divisor.eq(Long.MIN_VALUE))
//                     return this.unsigned ? Long.UZERO : Long.ZERO;
//                 if (this.isNegative()) {
//                     if (divisor.isNegative())
//                         return this.neg().div(divisor.neg());
//                     return this.neg().div(divisor).neg();
//                 } else if (divisor.isNegative())
//                     return this.div(divisor.neg()).neg();
//                 res = Long.ZERO;
//             } else {
//                 // The algorithm below has not been made for unsigned longs. It's therefore
//                 // required to take special care of the MSB prior to running it.
//                 if (!divisor.unsigned)
//                     divisor = divisor.toUnsigned();
//                 if (divisor.gt(this))
//                     return Long.UZERO;
//                 if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
//                     return Long.UONE;
//                 res = Long.UZERO;
//             }
//             // Repeat the following until the remainder is less than other:  find a
//             // floating-point that approximates remainder / other *from below*, add this
//             // into the result, and subtract it from the remainder.  It is critical that
//             // the approximate value is less than or equal to the real value so that the
//             // remainder never becomes negative.
//             rem = this;
//             while (rem.gte(divisor)) {
//                 // Approximate the result of division. This may be a little greater or
//                 // smaller than the actual value.
//                 approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
//                 // We will tweak the approximate result by changing it in the 48-th digit or
//                 // the smallest non-fractional digit, whichever is larger.
//                 var log2 = Math.ceil(Math.log(approx) / Math.LN2),
//                     delta = (log2 <= 48) ? 1 : Long.pow_dbl(2, log2 - 48),
//                     // Decrease the approximation until it is smaller than the remainder.  Note
//                     // that if it is too large, the product overflows and is negative.
//                     approxRes = Long.fromNumber(approx),
//                     approxRem = approxRes.mul(divisor);
//                 while (approxRem.isNegative() || approxRem.gt(rem)) {
//                     approx -= delta;
//                     approxRes = Long.fromNumber(approx, this.unsigned);
//                     approxRem = approxRes.mul(divisor);
//                 }
//                 // We know the answer can't be zero... and actually, zero would cause
//                 // infinite recursion since we would make no progress.
//                 if (approxRes.isZero())
//                     approxRes = Long.ONE;
//                 res = res.add(approxRes);
//                 rem = rem.sub(approxRem);
//             }
//             return res;
//         }
//         /**
//          * Returns this Long modulo the specified.
//          * @param {!Long|number|string} divisor Divisor
//          * @returns {!Long} Remainder
//          */
//         public mod(divisor) {
//             if (!this.isLong(divisor))
//                 divisor = Long.fromValue(divisor);
//             return this.sub(this.div(divisor).mul(divisor));
//         }
//         /**
//         * Returns the bitwise NOT of this Long.
//         * @returns {!Long}
//         */
//         public not() {
//             return Long.fromBits(~this.low, ~this.high, this.unsigned);
//         }
//         /**
//        * Returns the bitwise AND of this Long and the specified.
//        * @param {!Long|number|string} other Other Long
//        * @returns {!Long}
//        */
//         public and(other): Long {
//             if (!this.isLong(other))
//                 other = Long.fromValue(other);
//             return Long.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
//         }
//         /**
//         * Returns the bitwise OR of this Long and the specified.
//         * @param {!Long|number|string} other Other Long
//         * @returns {!Long}
//         */
//         public or(other): Long {
//             if (!this.isLong(other))
//                 other = Long.fromValue(other);
//             return Long.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
//         }
//         /**
//          * Returns the bitwise XOR of this Long and the given one.
//          * @param {!Long|number|string} other Other Long
//          * @returns {!Long}
//          */
//         public xor(other): Long {
//             if (!this.isLong(other))
//                 other = Long.fromValue(other);
//             return Long.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
//         }
//         /**
//          * Returns this Long with bits shifted to the left by the given amount.
//          * @param {number|!Long} numBits Number of bits
//          * @returns {!Long} Shifted Long
//          */
//         public shl(numBits): Long {
//             if (this.isLong(numBits))
//                 numBits = numBits.toInt();
//             if ((numBits &= 63) === 0)
//                 return this;
//             else if (numBits < 32)
//                 return Long.fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
//             else
//                 return Long.fromBits(0, this.low << (numBits - 32), this.unsigned);
//         }
//         /**
//          * Returns this Long with bits arithmetically shifted to the right by the given amount.
//          * @param {number|!Long} numBits Number of bits
//          * @returns {!Long} Shifted Long
//          */
//         public shr(numBits): Long {
//             if (this.isLong(numBits))
//                 numBits = numBits.toInt();
//             if ((numBits &= 63) === 0)
//                 return this;
//             else if (numBits < 32)
//                 return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
//             else
//                 return Long.fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
//         }
//         /**
//          * Returns this Long with bits logically shifted to the right by the given amount.
//          * @param {number|!Long} numBits Number of bits
//          * @returns {!Long} Shifted Long
//          */
//         public shru(numBits) {
//             if (this.isLong(numBits))
//                 numBits = numBits.toInt();
//             numBits &= 63;
//             if (numBits === 0)
//                 return this;
//             else {
//                 var high = this.high;
//                 if (numBits < 32) {
//                     var low = this.low;
//                     return Long.fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
//                 } else if (numBits === 32)
//                     return Long.fromBits(high, 0, this.unsigned);
//                 else
//                     return Long.fromBits(high >>> (numBits - 32), 0, this.unsigned);
//             }
//         }
//         /**
//          * Converts this Long to signed.
//          * @returns {!Long} Signed long
//          */
//         public toSigned(): Long {
//             if (!this.unsigned)
//                 return this;
//             return Long.fromBits(this.low, this.high, false);
//         }
//         /**
//          * Converts this Long to unsigned.
//          * @returns {!Long} Unsigned long
//          */
//         public toUnsigned() {
//             if (this.unsigned)
//                 return this;
//             return Long.fromBits(this.low, this.high, true);
//         }
//         /**
//          * Converts this Long to its little endian byte representation.
//          * @returns {!Array.<number>} Little endian byte representation
//          */
//         public toBytesLE() {
//             var hi = this.high,
//                 lo = this.low;
//             return [
//                 lo & 0xff,
//                 (lo >>> 8) & 0xff,
//                 (lo >>> 16) & 0xff,
//                 (lo >>> 24) & 0xff,
//                 hi & 0xff,
//                 (hi >>> 8) & 0xff,
//                 (hi >>> 16) & 0xff,
//                 (hi >>> 24) & 0xff
//             ];
//         }
//         /**
//          * Converts this Long to its big endian byte representation.
//          * @returns {!Array.<number>} Big endian byte representation
//          */
//         public toBytesBE() {
//             var hi = this.high,
//                 lo = this.low;
//             return [
//                 (hi >>> 24) & 0xff,
//                 (hi >>> 16) & 0xff,
//                 (hi >>> 8) & 0xff,
//                 hi & 0xff,
//                 (lo >>> 24) & 0xff,
//                 (lo >>> 16) & 0xff,
//                 (lo >>> 8) & 0xff,
//                 lo & 0xff
//             ];
//         }
//         /**
//          * @param {number} value
//          * @param {boolean=} unsigned
//          * @returns {!Long}
//          * @inner
//          */
//         public static fromInt(value, unsigned?: boolean) {
//             var obj, cachedObj, cache;
//             if (unsigned) {
//                 value >>>= 0;
//                 if (cache = (0 <= value && value < 256)) {
//                     cachedObj = Long.UINT_CACHE[value];
//                     if (cachedObj)
//                         return cachedObj;
//                 }
//                 obj = Long.fromBits(value, (value | 0) < 0 ? -1 : 0, true);
//                 if (cache)
//                     Long.UINT_CACHE[value] = obj;
//                 return obj;
//             } else {
//                 value |= 0;
//                 if (cache = (-128 <= value && value < 128)) {
//                     cachedObj = Long.INT_CACHE[value];
//                     if (cachedObj)
//                         return cachedObj;
//                 }
//                 obj = Long.fromBits(value, value < 0 ? -1 : 0, false);
//                 if (cache)
//                     Long.INT_CACHE[value] = obj;
//                 return obj;
//             }
//         }
//         /**
//          * @param {number} value
//          * @param {boolean=} unsigned
//          * @returns {!Long}
//          * @inner
//          */
//         public static fromNumber(value: number, unsigned?: boolean) {
//             if (isNaN(value) || !isFinite(value))
//                 return unsigned ? Long.UZERO : Long.ZERO;
//             if (unsigned) {
//                 if (value < 0)
//                     return Long.UZERO;
//                 if (value >= Long.TWO_PWR_64_DBL)
//                     return Long.MAX_UNSIGNED_VALUE;
//             } else {
//                 if (value <= -Long.TWO_PWR_63_DBL)
//                     return Long.MIN_VALUE;
//                 if (value + 1 >= Long.TWO_PWR_63_DBL)
//                     return Long.MAX_VALUE;
//             }
//             if (value < 0)
//                 return Long.fromNumber(-value, unsigned).neg();
//             return Long.fromBits((value % Long.TWO_PWR_32_DBL) | 0, (value / Long.TWO_PWR_32_DBL) | 0, unsigned);
//         }
//         /**
//          * @param {number} lowBits
//          * @param {number} highBits
//          * @param {boolean=} unsigned
//          * @returns {!Long}
//          * @inner
//          */
//         public static fromBits(lowBits, highBits, unsigned) {
//             return new Long(lowBits, highBits, unsigned);
//         }
//         /**
//          * @param {string} str
//          * @param {(boolean|number)=} unsigned
//          * @param {number=} radix
//          * @returns {!Long}
//          * @inner
//          */
//         public static fromString(str: string, unsigned?: boolean, radix?: any) {
//             if (str.length === 0)
//                 throw Error('empty string');
//             if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
//                 return Long.ZERO;
//             if (typeof unsigned === 'number') {
//                 // For goog.math.long compatibility
//                 radix = unsigned,
//                     unsigned = false;
//             } else {
//                 unsigned = !!unsigned;
//             }
//             radix = radix || 10;
//             if (radix < 2 || 36 < radix)
//                 throw RangeError('radix');
//             var p;
//             if ((p = str.indexOf('-')) > 0)
//                 throw Error('interior hyphen');
//             else if (p === 0) {
//                 return Long.fromString(str.substring(1), unsigned, radix).neg();
//             }
//             // Do several (8) digits each time through the loop, so as to
//             // minimize the calls to the very expensive emulated div.
//             var radixToPower = Long.fromNumber(Long.pow_dbl(radix, 8));
//             var result = Long.ZERO;
//             for (var i = 0; i < str.length; i += 8) {
//                 var size = Math.min(8, str.length - i),
//                     value = parseInt(str.substring(i, i + size), radix);
//                 if (size < 8) {
//                     var power = Long.fromNumber(Long.pow_dbl(radix, size));
//                     result = result.mul(power).add(Long.fromNumber(value));
//                 } else {
//                     result = result.mul(radixToPower);
//                     result = result.add(Long.fromNumber(value));
//                 }
//             }
//             result.unsigned = unsigned;
//             return result;
//         }
//         /**
//          * @function
//          * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
//          * @returns {!Long}
//          * @inner
//          */
//         public static fromValue(val) :Long{
//             if (val /* is compatible */ instanceof Long)
//                 return val;
//             if (typeof val === 'number')
//                 return Long.fromNumber(val);
//             if (typeof val === 'string')
//                 return Long.fromString(val);
//             // Throws for non-objects, converts non-instanceof Long:
//             return Long.fromBits(val.low, val.high, val.unsigned);
//         }
//           /**
//          * @function
//          * @param any
//          * @returns {Boolean}
//          * @inner
//          */
//         public static isLong(obj){
//             return (obj instanceof Long) ? true :false;
//         }
//     }
// protobuf.util.Long = Long;
// protobuf.configure();
