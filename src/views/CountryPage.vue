<template>
  <main>
    <div class="container pt-[50px] pb-[30px]">
      <button
        @click="$router.push({ path: '/' })"
        class="back flex items-center gap-[10px] py-[10px] px-[40px] rounded-md shadow-md mb-[50px] trantion duration-300 hover:translate-y-[-5px] hover:shadow-xl"
      >
        <i class="fa-solid fa-arrow-left-long transtion duration-300"></i>
        <span>Back</span>
      </button>

      <div
        class="content flex items-center gap-[50px] max-md:flex-col"
        v-if="requestData"
      >
        <div class="image flex-[50%]">
          <img :src="requestData.flags.svg" alt="image-flag" class="w-full" />
        </div>

        <div class="content-info flex-[50%] text-start">
          <h2 class="text-[2rem] font-[600]">{{ requestData.name }}</h2>

          <div
            class="flex justify-between mt-[30px] mb-[50px] max-md:flex-col max-md:gap-[5px]"
          >
            <ul class="flex flex-col gap-[5px]">
              <li><b>Native Name:</b> {{ requestData.nativeName }}</li>
              <li><b>Population:</b> {{ requestData.population }}</li>
              <li><b>Region:</b> {{ requestData.region }}</li>
              <li><b>Sub Region:</b> {{ requestData.subregion }}</li>
              <li><b>Capital:</b> {{ requestData.capital }}</li>
            </ul>
            <ul class="flex flex-col gap-[5px]">
              <li>
                <b>Top Level Domain:</b>
                {{ requestData.topLevelDomain[0].replace(".", "") }}
              </li>
              <li><b>Currencies:</b> {{ requestData.currencies[0].code }}</li>
              <li>
                <b>Languages: </b>
                <span v-for="(lan, i) in requestData.languages" :key="i">
                  <span v-if="i != 0">, </span>{{ lan.name }}
                </span>
              </li>
            </ul>
          </div>

          <div class="border-countries flex flex-wrap items-center gap-[10px]">
            <b>Boredr Countries:</b>
            <span
              v-for="(bord, i) in requestData.borders"
              :key="i"
              class="ml-[5px] rounded-md shadow-md py-[5px] px-[30px] text-[12px] trantion duration-300 hover:translate-y-[-5px] hover:shadow-xl"
            >
              {{ bord }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      requestData: null,
    };
  },
  async mounted() {
    // console.log(this.$route.params.CName);
    const name = this.$route.params.CName;

    await fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        this.requestData = data.find((el) => el.alpha3Code === name);
      });
  },
};
</script>

<style lang="scss">
main {
  min-height: calc(100vh - 80px);

  .back {
    background: var(--bg);
  }

  .border-countries {
    span {
      background: var(--bg);
    }
  }
}
</style>
