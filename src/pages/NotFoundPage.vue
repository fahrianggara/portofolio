

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex flex-col gap-3 items-center justify-center h-screen px-4">
      <h1 class="dark:text-white text-2xl font-bold text-center">404</h1>
      <p class="dark:text-white text-center text-base/relaxed text-[15px] sm:text-[16px]">
        Oops! The page you are looking for has been removed or relocated.
      </p>
      <router-link to="/">
        <span class="text-primary text-[15px] font-medium cursor-pointer hover:underline ease-in-out duration-75">
          Go back to home
        </span>
      </router-link>
    </div>
  </div>
</template>