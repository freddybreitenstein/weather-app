import { usePlaceAutocomplete } from "@/api/search";
import { addSearch } from "@/store/recentSearchesSlice";
import { useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const { data: suggestionsList, isFetching } = usePlaceAutocomplete(query);
  const dataSet: AutocompleteDropdownItem[] | null = useMemo(
    () =>
      suggestionsList
        ? suggestionsList?.map((item) => ({ id: item.id, title: item.title }))
        : null,
    [suggestionsList]
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const onClearPress = useCallback(() => {
    setQuery("");
  }, []);

  const onSelectItem = useCallback(
    (item: AutocompleteDropdownItem | null) => {
      if (!item) return;

      const result = suggestionsList?.find(
        (suggestion) => suggestion.id === item.id
      );

      if (!result) return;

      dispatch(addSearch(result));
    },
    [dispatch, suggestionsList]
  );

  return (
    <AutocompleteDropdown
      closeOnBlur={true}
      closeOnSubmit
      showChevron={false}
      dataSet={dataSet}
      textInputProps={{
        placeholder: t("searchPlaceholder"),
      }}
      emptyResultText={t("noResults")}
      onChangeText={setQuery}
      onClear={onClearPress}
      onSelectItem={onSelectItem}
      loading={isFetching}
      debounce={100}
    />
  );
}
