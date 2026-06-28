<template>
  <main>
    <div class="container">
      <div
        class="title-main flex items-center justify-between py-[50px] max-md:flex-col max-md:items-start max-md:gap-[30px]"
      >
        <div
          class="input relative w-[400px] shadow-md rounded-md overflow-hidden max-md:w-full"
        >
          <i
            class="fa-brands fa-sistrix absolute left-[15px] top-[50%] translate-y-[-50%]"
          ></i>
          <input
            v-model="search"
            class="py-[15px] pl-[50px] pr-[20px] w-full outline-none"
            type="text"
            name="text"
            id="text"
            placeholder="Search for country..."
          />
        </div>

        <!--=== Button Filter ===-->
        <div class="filter relative">
          <button
            @click="filter = !filter"
            class="px-[20px] py-[15px] flex items-center gap-[30px] shadow-md rounded-md"
          >
            <span>Filter by Region</span>
            <i class="fa-solid fa-angle-down"></i>
          </button>

          <Transition name="slide-fade">
            <ul
              v-if="filter"
              class="absolute w-full top-[60px] p-[10px] flex flex-col gap-[10px] justify-start shadow-md rounded-md z-10"
            >
              <li
                v-for="(value, i) in selectedRegion"
                :key="i"
                class="text-start cursor-pointer hover:ml-[10px] trantion duration-300"
                :class="value.selected ? 'ml-[10px] opacity-100' : 'opacity-50'"
                @click="value.selected = !value.selected"
              >
                {{ value.name }}
              </li>
            </ul>
          </Transition>
        </div>
      </div>

      <TransitionGroup
        tag="div"
        class="cards py-[50px]"
        :css="false"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          @click="
            $router.push({
              name: 'country',
              params: { CName: value.alpha3Code },
            })
          "
          class="card shadow-md rounded-md cursor-pointer hover:translate-y-[-5px] hover:shadow-xl taintion duration-300 overflow-hidden"
          v-for="(value, i) in searchcountry()"
          :key="value.alpha3Code"
          :data-index="i"
        >
          <img
            :src="value.flags.png"
            alt="image-flag"
            class="w-full h-[150px]"
          />
          <div class="info-card pb-[40px] p-[20px] text-start">
            <h2 class="mb-[20px] text-[1.25rem] font-[700]">
              {{ value.name }}
            </h2>
            <ul>
              <li>
                <span class="font-[600]">Population:</span>
                {{ value.population }}
              </li>
              <li>
                <span class="font-[600]">Region:</span> {{ value.region }}
              </li>
              <li>
                <span class="font-[600]">Capital:</span> {{ value.capital }}
              </li>
            </ul>
          </div>
        </div>
      </TransitionGroup>

      <!--=== Error ===-->
      <h2
        v-if="searchcountry().length == 0 && search !== ''"
        class="font-[600] text-[3rem]"
      >
        <i class="fa-regular fa-circle-xmark text-[red]"></i>
        <span class="block">Not Found</span>
      </h2>
    </div>
  </main>
</template>

<!--=== Script Javascript ===-->
<script>
import gsap from "gsap";

export default {
  data() {
    return {
      requestData: [],
      filter: false,
      search: "",
      selectedRegion: [
        {
          name: "Africa",
          selected: false,
        },
        {
          name: "Americas",
          selected: false,
        },
        {
          name: "Asia",
          selected: false,
        },
        {
          name: "Europe",
          selected: false,
        },
        {
          name: "Oceania",
          selected: false,
        },
      ],
    };
  },

  methods: {
    searchcountry() {
      try {
        // جيب الـ regions اللي selected = true
        const activeRegions = this.selectedRegion
          .filter((r) => r.selected)
          .map((r) => r.name);

        return this.requestData.filter((el) => {
          const matchName = el.name
            .toLowerCase()
            .includes(this.search.toLowerCase());

          // لو مفيش region اتختار → رجع كل الداتا
          const matchRegion =
            activeRegions.length === 0 || activeRegions.includes(el.region);

          return matchName && matchRegion;
        });
      } catch {
        return [];
      }
    },

    onEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
  },

  async mounted() {
    await fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          this.requestData.push(element);
        });
      });
  },
};
</script>

<!--=== Style CSS ===-->
<style lang="scss">
main {
  background: var(--elements);
  color: var(--text);
  transition: background 0.3s, color 0.3s;

  .input {
    input {
      background: var(--bg);
      color: var(--text);
      transition: background 0.3s, color 0.3s;
    }
  }

  .filter {
    button {
      background: var(--bg);
      transition: background 0.3s, color 0.3s;
    }

    ul {
      background: var(--bg);
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 50px;

    .card {
      background: var(--bg);
    }
  }
}

// Animation Filter
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
