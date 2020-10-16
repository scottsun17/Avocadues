package com.avocadues.todolist.utils;

import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.util.UUID;

public class IdUtils {
    private static String middle = "";

    static {
        middle = MathUtils.makeUpNewData(Math.abs(NetworkUtils.getHostIP().hashCode()) + "", 4) + // 4位IP地址hash
                MathUtils.makeUpNewData(NetworkUtils.getPid(), 4); // 4位PID进程hash
    }

    /**
     * Use Nanosecond as base unit, return a unique auto increment id
     * 
     * <pre>
     * System.nanoTime()
     * </pre>
     * 
     * <pre>
     *  Thread Count:   100
     *  Execute Count:   1000
     *  Average Time:   222 ms
     *  Array length:   100000
     *  Map Size:   100000
     * </pre>
     * 
     * @return id length 33
     */
    public static String getIncreaseIdByNanoTime() {
        return System.nanoTime() + // Time Stam 14 units
                middle + // Sign 8 units
                MathUtils.makeUpNewData(Thread.currentThread().hashCode() + "", 3) + // 3-bit thread flag
                MathUtils.randomDigitNumber(7); // random 7 digit number
    }

    /**
     * Use millisecond as base unit, return a unique auto increment id, run
     * possibility for thread concurrency
     * 
     * <pre>
     * System.currentTimeMillis()
     * </pre>
     * 
     * <pre>
     *  Thread Count:   100
     *  Execute Times:   1000
     *  Average Time:   206 ms
     *  Array Lengh:   100000
     *  Map Size:   99992
     * </pre>
     * 
     * @return ID length 32
     */
    public static String getIncreaseIdByCurrentTimeMillis() {
        return System.currentTimeMillis() + // 时间戳-14位
                middle + // 标志-8位
                MathUtils.makeUpNewData(Thread.currentThread().hashCode() + "", 3) + // 3位线程标志
                MathUtils.randomDigitNumber(8); // 随机8位数
    }

    /**
     * 基于UUID+MD5产生唯一无序ID
     * 
     * <pre>
     *  Thread Count:   100
     *  Execute Times:   1000
     *  Average Time:       591 ms
     *  Array Lengh:   100000
     *  Map Size:   100000
     * </pre>
     * 
     * @return ID length 32
     */
    public static String getRandomIdByUUID() {
        return DigestUtils.md5Hex(UUID.randomUUID().toString());
    }

    /*
     * -----------------------------------------------------------------------------
     * ----------------
     */
    /** String MD5 Util Class */
    private static class DigestUtils {

        private static final char[] DIGITS_LOWER = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c',
                'd', 'e', 'f' };

        private static final char[] DIGITS_UPPER = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C',
                'D', 'E', 'F' };

        private static char[] encodeHex(final byte[] data, final char[] toDigits) {
            final int l = data.length;
            final char[] out = new char[l << 1];
            for (int i = 0, j = 0; i < l; i++) {
                out[j++] = toDigits[(0xF0 & data[i]) >>> 4];
                out[j++] = toDigits[0x0F & data[i]];
            }
            return out;
        }

        public static String md5Hex(String str) {
            return md5Hex(str, false);
        }

        public static String md5Hex(String str, boolean isUpper) {
            try {
                return new String(encodeHex(MessageDigest.getInstance("MD5").digest(str.getBytes("UTF-8")),
                        isUpper ? DIGITS_UPPER : DIGITS_LOWER));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    /*
     * -----------------------------------------------------------------------------
     * ----------------
     */
    /** Network Related Util Class */
    private static class NetworkUtils {

        private static final String DEFAULT_HOST_IP = "10.10.10.10";

        /**
         * Get the PID of the current process
         * 
         */
        public static String getPid() {
            return ManagementFactory.getRuntimeMXBean().getName().split("@")[0];
        }

        /**
         * Get the host IP address of the current process
         */
        public static String getHostIP() {
            try {
                return InetAddress.getLocalHost().getHostAddress();
            } catch (UnknownHostException e) {
                return DEFAULT_HOST_IP;
            }
        }

    }

    /*
     * -----------------------------------------------------------------------------
     * ----------------
     */
    /** Data processing related classes */
    private static class MathUtils {

        private static final String DEFAULT_DIGITS = "0";
        private static final String FIRST_DEFAULT_DIGITS = "1";

        /**
         * @param target Target Number
         * @param length The number of digits to be added. Deafult [0] Default
         *               supplement[1]
         * @return
         */
        public static String makeUpNewData(String target, int length) {
            return makeUpNewData(target, length, DEFAULT_DIGITS);
        }

        /**
         * @param target Target Number
         * @param length 需要补充到的位数
         * @param add    The number of digits to be added. Deafult [0] Default
         *               supplement[1]
         * @return
         */
        public static String makeUpNewData(String target, int length, String add) {
            if (target.startsWith("-"))
                target.replace("-", "");
            if (target.length() >= length)
                return target.substring(0, length);
            StringBuffer sb = new StringBuffer(FIRST_DEFAULT_DIGITS);
            for (int i = 0; i < length - (1 + target.length()); i++) {
                sb.append(add);
            }
            return sb.append(target).toString();
        }

        /**
         * Produce a random string number with a specified number of digits
         * 
         * @param length
         * @return
         */
        public static String randomDigitNumber(int length) {
            int start = Integer.parseInt(makeUpNewData("", length)); // 1000+8999=9999
            int end = Integer.parseInt(makeUpNewData("", length + 1)) - start; // 9000
            return (int) (Math.random() * end) + start + "";
        }

    }
}
