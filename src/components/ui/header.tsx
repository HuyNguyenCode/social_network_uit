import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Header() {
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("header-content")}>
          <div className={cx("left-content")}>
            <Image
              aria-hidden
              src="/logo.svg"
              alt="File icon"
              width={40}
              height={40}
              className="logo"
            />
            <p>UIT </p>
          </div>
          <div className={cx("middle-content")}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={cx("search-input")}
            />
            <svg
              className={cx("search-icon")}
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M18.8294 16.8367L15.1193 13.125C16.2317 11.6754 16.7511 9.85688 16.572 8.03841C16.393 6.21993 15.5289 4.53765 14.1551 3.33282C12.7813 2.12799 11.0007 1.49084 9.17436 1.55061C7.34807 1.61038 5.61289 2.3626 4.32081 3.65467C3.02873 4.94675 2.27652 6.68193 2.21675 8.50822C2.15698 10.3345 2.79413 12.1152 3.99896 13.489C5.20378 14.8628 6.88607 15.7268 8.70454 15.9059C10.523 16.0849 12.3415 15.5656 13.7912 14.4531L17.5044 18.1672C17.5916 18.2544 17.6952 18.3236 17.8091 18.3708C17.923 18.418 18.0452 18.4423 18.1685 18.4423C18.2918 18.4423 18.4139 18.418 18.5279 18.3708C18.6418 18.3236 18.7454 18.2544 18.8326 18.1672C18.9198 18.08 18.9889 17.9765 19.0361 17.8625C19.0833 17.7486 19.1076 17.6265 19.1076 17.5031C19.1076 17.3798 19.0833 17.2577 19.0361 17.1438C18.9889 17.0298 18.9198 16.9263 18.8326 16.8391L18.8294 16.8367ZM4.10365 8.75002C4.10365 7.6993 4.41523 6.67218 4.99897 5.79855C5.58272 4.92491 6.41241 4.244 7.38315 3.84191C8.35388 3.43981 9.42205 3.33461 10.4526 3.53959C11.4831 3.74458 12.4297 4.25054 13.1727 4.99351C13.9156 5.73648 14.4216 6.68307 14.6266 7.7136C14.8316 8.74412 14.7264 9.81229 14.3243 10.783C13.9222 11.7538 13.2413 12.5835 12.3676 13.1672C11.494 13.7509 10.4669 14.0625 9.41615 14.0625C8.00763 14.0611 6.65722 13.5009 5.66125 12.5049C4.66527 11.5089 4.1051 10.1585 4.10365 8.75002Z"
                fill="#475569"
              />
            </svg>
          </div>
          <div className={cx("right-content")}>
            <button className={cx("create-button")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                  fill="white"
                />
              </svg>
              <span>Create</span>
            </button>
            <button className={cx("cursor-button")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.5787 14.6119C13.2272 14.2602 12.7504 14.0626 12.2531 14.0625C12.1358 14.0627 12.0188 14.0737 11.9034 14.0953C11.6033 14.152 11.3215 14.2811 11.0827 14.4714C10.8438 14.6618 10.655 14.9076 10.5328 15.1875C10.5249 15.2054 10.5182 15.2233 10.5112 15.2416C10.5091 15.2473 10.5069 15.253 10.5047 15.2587L13.5787 14.6119ZM13.5787 14.6119L18.0906 19.1237L13.5787 14.6119ZM16.609 12.3637L16.5391 12.3885L16.5915 12.441L20.9809 16.8303L21.0141 16.7972L20.9809 16.8303C21.1508 17.0001 21.2855 17.2017 21.3774 17.4235C21.4693 17.6454 21.5166 17.8831 21.5166 18.1233C21.5166 18.3634 21.4693 18.6012 21.3774 18.823C21.2855 19.0449 21.1508 19.2465 20.9809 19.4162L19.4162 20.98L19.4494 21.0131L19.4162 20.98C19.0734 21.3227 18.6085 21.5152 18.1238 21.5152C17.639 21.5152 17.1741 21.3227 16.8313 20.98L12.441 16.5906L12.3885 16.5382L12.3637 16.608L11.0971 20.163L11.097 20.1634C11.089 20.1864 11.0801 20.2086 11.0702 20.2311C10.9211 20.5686 10.6734 20.8532 10.3595 21.0473C10.0456 21.2414 9.68037 21.336 9.31174 21.3185C8.94311 21.3011 8.58838 21.1726 8.2942 20.9498C8.00003 20.7269 7.78017 20.4203 7.66355 20.0702C7.66354 20.0702 7.66354 20.0702 7.66354 20.0702L2.76338 5.06316C2.76337 5.06312 2.76335 5.06309 2.76334 5.06305C2.66053 4.74305 2.64792 4.4009 2.72691 4.07421C2.80591 3.74748 2.97347 3.44885 3.21116 3.21116C3.44885 2.97347 3.74748 2.80591 4.07421 2.72691C4.40091 2.64792 4.74306 2.66053 5.06306 2.76335C5.0631 2.76336 5.06313 2.76337 5.06316 2.76338L20.0711 7.66354C20.0712 7.66355 20.0712 7.66356 20.0712 7.66357C20.4213 7.7802 20.7279 8.00005 20.9507 8.2942C21.1735 8.58838 21.3021 8.94311 21.3195 9.31174C21.3369 9.68037 21.2423 10.0456 21.0482 10.3595C20.8541 10.6734 20.5696 10.9211 20.232 11.0702C20.2096 11.0801 20.1873 11.089 20.1644 11.097L20.164 11.0971L16.609 12.3637ZM18.0906 19.19L18.1238 19.2232L18.1569 19.19L19.191 18.156L19.2241 18.1228L19.191 18.0897L14.646 13.5447C14.4353 13.334 14.2794 13.0751 14.1916 12.7905C14.1039 12.5058 14.087 12.204 14.1425 11.9114C14.198 11.6187 14.3242 11.344 14.5101 11.1113C14.696 10.8785 14.9359 10.6947 15.209 10.5758L15.2092 10.5757C15.2313 10.566 15.2546 10.557 15.2774 10.5488C15.2774 10.5488 15.2774 10.5488 15.2774 10.5488L18.3439 9.45666L18.4732 9.41057L18.3427 9.36794L5.10424 5.04513L5.01647 5.01647L5.04513 5.10424L9.36794 18.3427L9.41059 18.4733L9.45666 18.3438L10.5484 15.2756C10.5485 15.2754 10.5486 15.2752 10.5487 15.275C10.551 15.2689 10.5532 15.2631 10.5554 15.2574C10.5622 15.2394 10.5684 15.223 10.5757 15.2064L10.5758 15.2063C10.6949 14.9333 10.879 14.6937 11.1119 14.5081C11.3448 14.3225 11.6195 14.1966 11.9121 14.1414C12.0246 14.1203 12.1388 14.1096 12.2532 14.1094C12.738 14.1095 13.2029 14.3022 13.5456 14.645L13.5456 14.645L18.0906 19.19ZM1.84143 13.7724L1.84142 13.7724L1.84029 13.7728C1.70499 13.8218 1.56126 13.8432 1.41755 13.8358C1.27385 13.8283 1.13309 13.7922 1.00357 13.7295C0.874049 13.6668 0.758387 13.5788 0.663402 13.4707C0.568417 13.3627 0.496031 13.2366 0.450509 13.1001C0.404988 12.9636 0.387253 12.8194 0.398349 12.6759C0.409445 12.5325 0.449148 12.3927 0.515118 12.2648C0.581088 12.1369 0.67199 12.0235 0.782467 11.9313C0.892943 11.8391 1.02076 11.77 1.15838 11.728L1.15838 11.728L1.15951 11.7276L2.28451 11.3526C2.41884 11.3078 2.56067 11.2899 2.70191 11.3C2.84315 11.31 2.98103 11.3477 3.10767 11.4111C3.23432 11.4744 3.34725 11.562 3.44002 11.669C3.53278 11.776 3.60357 11.9002 3.64833 12.0345C3.7385 12.3056 3.71733 12.6015 3.58947 12.8571C3.4616 13.1126 3.23751 13.307 2.96643 13.3974C2.96642 13.3974 2.96642 13.3974 2.96642 13.3974L1.84143 13.7724ZM7.92188 1.5V1.125C7.92188 0.839063 8.03546 0.564838 8.23765 0.36265C8.43984 0.160463 8.71406 0.046875 9 0.046875C9.28594 0.046875 9.56016 0.160463 9.76235 0.36265C9.96454 0.564838 10.0781 0.839063 10.0781 1.125V1.5C10.0781 1.78594 9.96454 2.06016 9.76235 2.26235C9.56016 2.46454 9.28594 2.57812 9 2.57812C8.71406 2.57812 8.43984 2.46454 8.23765 2.26235C8.03546 2.06016 7.92188 1.78594 7.92188 1.5ZM1.125 10.0781C0.839063 10.0781 0.564838 9.96454 0.36265 9.76235C0.160463 9.56016 0.046875 9.28594 0.046875 9C0.046875 8.71406 0.160463 8.43984 0.36265 8.23765C0.564838 8.03546 0.839063 7.92188 1.125 7.92188H1.5C1.78594 7.92188 2.06016 8.03546 2.26235 8.23765C2.46454 8.43984 2.57812 8.71406 2.57812 9C2.57812 9.28594 2.46454 9.56016 2.26235 9.76235C2.06016 9.96454 1.78594 10.0781 1.5 10.0781H1.125ZM11.3528 2.284L11.7274 1.15998C11.7275 1.1599 11.7275 1.15981 11.7275 1.15973C11.8202 0.891518 12.0149 0.670655 12.2693 0.545054C12.5239 0.419412 12.8177 0.399232 13.0871 0.488892C13.3564 0.578552 13.5795 0.770818 13.708 1.02396C13.8364 1.27702 13.8598 1.57049 13.7733 1.84073C13.7732 1.84082 13.7732 1.84091 13.7732 1.841L13.3985 2.96502C13.3985 2.9651 13.3984 2.96519 13.3984 2.96527C13.3057 3.23348 13.1111 3.45434 12.8566 3.57995C12.602 3.70559 12.3082 3.72577 12.0389 3.63611C11.7695 3.54645 11.5464 3.35418 11.418 3.10104C11.2896 2.84798 11.2661 2.55451 11.3527 2.28427C11.3527 2.28418 11.3527 2.28409 11.3528 2.284Z"
                  fill="#475569"
                  stroke="#475569"
                  strokeWidth="0.09375"
                />
              </svg>
            </button>
            <button className={cx("message-button")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.82812 19.125V19.1719H4.875H12.375C13.8676 19.1719 15.3267 18.7293 16.5678 17.9C17.8089 17.0707 18.7762 15.8921 19.3474 14.5131C19.9186 13.1341 20.0681 11.6166 19.7769 10.1527C19.4857 8.68873 18.7669 7.344 17.7114 6.28855C16.656 5.2331 15.3113 4.51433 13.8473 4.22314C12.3834 3.93194 10.8659 4.08139 9.48694 4.6526C8.10792 5.2238 6.92926 6.1911 6.1 7.43218C5.27074 8.67326 4.82812 10.1324 4.82812 11.625V19.125ZM5.51687 4.76687C7.33597 2.94777 9.80243 1.9246 12.375 1.92188C14.9484 1.92188 17.4165 2.94417 19.2361 4.76385C21.0558 6.58354 22.0781 9.05157 22.0781 11.625C22.0781 14.1984 21.0558 16.6665 19.2361 18.4861C17.4165 20.3058 14.9484 21.3281 12.375 21.3281H4.5C4.01515 21.3281 3.55016 21.1355 3.20732 20.7927C2.86448 20.4498 2.67188 19.9848 2.67188 19.5V11.625C2.6746 9.05243 3.69777 6.58597 5.51687 4.76687ZM11.5781 12C11.5781 12.2874 11.4929 12.5683 11.3332 12.8073C11.1736 13.0463 10.9466 13.2325 10.6811 13.3425C10.4156 13.4525 10.1234 13.4813 9.84151 13.4252C9.55963 13.3691 9.30071 13.2307 9.09749 13.0275C8.89426 12.8243 8.75587 12.5654 8.6998 12.2835C8.64373 12.0016 8.6725 11.7094 8.78249 11.4439C8.89247 11.1784 9.07872 10.9514 9.31769 10.7918C9.55665 10.6321 9.8376 10.5469 10.125 10.5469C10.5104 10.5469 10.88 10.7 11.1525 10.9725C11.425 11.245 11.5781 11.6146 11.5781 12ZM16.0781 12C16.0781 12.2874 15.9929 12.5683 15.8332 12.8073C15.6736 13.0463 15.4466 13.2325 15.1811 13.3425C14.9156 13.4525 14.6234 13.4813 14.3415 13.4252C14.0596 13.3691 13.8007 13.2307 13.5975 13.0275C13.3943 12.8243 13.2559 12.5654 13.1998 12.2835C13.1437 12.0016 13.1725 11.7094 13.2825 11.4439C13.3925 11.1784 13.5787 10.9514 13.8177 10.7918C14.0567 10.6321 14.3376 10.5469 14.625 10.5469C15.0104 10.5469 15.38 10.7 15.6525 10.9725C15.925 11.245 16.0781 11.6146 16.0781 12Z"
                  fill="#475569"
                  stroke="#475569"
                  strokeWidth="0.09375"
                />
              </svg>
            </button>
            <button className={cx("noti-button")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.50027 18.375H19.5003C19.8297 18.377 20.1537 18.2913 20.4389 18.1265C20.7241 17.9617 20.9603 17.7239 21.1231 17.4375L4.50027 18.375ZM2.92173 15.5795L2.92173 15.5795C3.74118 14.17 4.17215 12.1527 4.17215 9.75C4.17215 7.67385 4.99689 5.68274 6.46495 4.21468C7.93301 2.74662 9.92412 1.92188 12.0003 1.92188C14.0764 1.92188 16.0675 2.74662 17.5356 4.21468C19.0036 5.68274 19.8284 7.67385 19.8284 9.75C19.8284 12.1517 20.2612 14.1699 21.0806 15.5794C21.2418 15.8582 21.3269 16.1745 21.3272 16.4965C21.3275 16.8186 21.2431 17.135 21.0825 17.4141L21.0823 17.4143C20.9237 17.6935 20.6935 17.9253 20.4155 18.0859C20.1374 18.2465 19.8216 18.3301 19.5006 18.3281H19.5003L4.50027 18.3281L4.49991 18.3281C4.17837 18.3306 3.862 18.2472 3.58346 18.0866C3.30491 17.9259 3.07429 17.6939 2.9154 17.4143L2.91533 17.4142C2.75536 17.1347 2.67174 16.818 2.67286 16.496C2.67399 16.174 2.75981 15.8579 2.92173 15.5795ZM5.08258 16.1043L5.04936 16.1719H5.12465H18.875H18.9502L18.917 16.1043C18.0914 14.4251 17.6721 12.2887 17.6721 9.75C17.6721 8.24573 17.0746 6.80306 16.0109 5.73938C14.9472 4.6757 13.5045 4.07812 12.0003 4.07812C10.496 4.07812 9.05333 4.6757 7.98965 5.73938C6.92597 6.80306 6.3284 8.24573 6.3284 9.75C6.3284 12.2896 5.90819 14.4251 5.08258 16.1043ZM16.0784 21C16.0784 21.2859 15.9648 21.5602 15.7626 21.7623C15.5604 21.9645 15.2862 22.0781 15.0003 22.0781H9.00027C8.71433 22.0781 8.44011 21.9645 8.23792 21.7623C8.03573 21.5602 7.92215 21.2859 7.92215 21C7.92215 20.7141 8.03573 20.4398 8.23792 20.2377C8.44011 20.0355 8.71433 19.9219 9.00027 19.9219H15.0003C15.2862 19.9219 15.5604 20.0355 15.7626 20.2377C15.9648 20.4398 16.0784 20.7141 16.0784 21Z"
                  fill="#475569"
                  stroke="#475569"
                  strokeWidth="0.09375"
                />
              </svg>
            </button>
            <Image
              className={cx("avatar")}
              aria-hidden
              src="/avatar.jpg"
              alt="File icon"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
      {/* <ul>
                <li>
                    <Link href={'/login'}>Đăng nhập</Link>
                </li>
                <li>
                    <Link href={'/register'}>Đăng ký</Link>
                </li>
            </ul>    */}
      {/* <ModeToggle/> */}
    </div>
  );
}
