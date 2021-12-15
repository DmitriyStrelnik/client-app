import React from "react";
import { Segment, Form, Button, Grid, List } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { CategoryFormValues, ICategory } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  key: isRequired({ message: "The category title is required" }),
  text: isRequired({ message: "text" }),
  value: isRequired({ message: "Value" }),
});

interface DetailParams {
  id: string;
}

const CategoryForm: React.FC<RouteComponentProps<DetailParams>> = ({
  history,
}) => {
  const [cookies, setCookie] = useCookies<any>(["categories"]);

  const category = new CategoryFormValues();

  const createCategory = (newCategory: ICategory) => {
    const newCategories = [...cookies.categories];
    newCategories.push(newCategory);
    setCookie("categories", newCategories);
  };

  const editCategory = (newCategory: ICategory) => {
    const newCategories = [...cookies.categories];
    const objIndex = newCategories.findIndex(
      (obj: any) => obj.key === newCategory.key
    );
    newCategories[objIndex] = newCategory;
    setCookie("categories", newCategories);
  };
  
  const removeCategory = (key: string) => {
    const newCategories = cookies.categories.filter((el: any) => el.key !== key );
    setCookie("categories", newCategories);
  };

  const handleFinalFormSubmit = (category: any) => {
    if (cookies.categories.some((obj: any) => obj.key === category.key)) {
      editCategory(category);
    } else {
      createCategory(category);
    }
  };

  return (
    <Grid>
      <Grid.Column width={9}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={category}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine, form }) => (
              <Form onSubmit={e => { handleSubmit(e); form.reset()}}>
                <Field name="key" placeholder="Key" component={TextInput} />
                <Field name="text" placeholder="Text" component={TextInput} />
                <Field name="value" placeholder="Value" component={TextInput} />
                <Button
                  disabled={invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/activities")}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={7}>
        <Segment clearing>
          <List divided className="categoryList" size="big">
            {cookies.categories.map((category: any) => (
              <List.Item className="categoryListItem">
                <List.Content>
                  {category.value}
                  <span className="categoryListItemSubtext">key: {category.key}</span>
                  </List.Content>
                <List.Content>
                  <Button onClick={() => removeCategory(category.key)}>Delete</Button>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

/* <List>
    cookies.categories.map((category: any) => <List.Item>category.value</List.Item>)
  </List>
 */
export default observer(CategoryForm);
